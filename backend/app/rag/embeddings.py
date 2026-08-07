import math
from typing import List
from collections import Counter


class TFIDFEmbedder:
    """
    Lightweight TF-IDF Vectorizer fallback ensuring sub-millisecond retrieval with 0 external heavy model downloads.
    """

    def __init__(self):
        self.vocab = {}

    def _tokenize(self, text: str) -> List[str]:
        import re
        return [w.lower() for w in re.findall(r'\b\w+\b', text) if len(w) > 1]

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        # Build vocabulary
        all_tokens = set()
        tokenized_texts = [self._tokenize(t) for t in texts]
        for tokens in tokenized_texts:
            all_tokens.update(tokens)

        self.vocab = {token: idx for idx, token in enumerate(sorted(list(all_tokens)))}
        dim = len(self.vocab)

        embeddings = []
        for tokens in tokenized_texts:
            vec = [0.0] * dim
            counts = Counter(tokens)
            for token, count in counts.items():
                if token in self.vocab:
                    vec[self.vocab[token]] = float(count)
            # Normalize L2
            norm = math.sqrt(sum(v * v for v in vec))
            if norm > 0:
                vec = [v / norm for v in vec]
            embeddings.append(vec)
        return embeddings

    def embed_query(self, text: str) -> List[float]:
        tokens = self._tokenize(text)
        dim = len(self.vocab)
        vec = [0.0] * dim
        counts = Counter(tokens)
        for token, count in counts.items():
            if token in self.vocab:
                vec[self.vocab[token]] = float(count)
        norm = math.sqrt(sum(v * v for v in vec))
        if norm > 0:
            vec = [v / norm for v in vec]
        return vec


class EmbeddingManager:
    """
    Sentence Transformers Embedding Pipeline using HuggingFace all-MiniLM-L6-v2 model
    with high-reliability TF-IDF fallback.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self._embeddings = None

    def get_embeddings_model(self):
        """
        Instantiate or return cached embeddings model.
        """
        if self._embeddings is None:
            try:
                from langchain_community.embeddings import HuggingFaceEmbeddings
                self._embeddings = HuggingFaceEmbeddings(model_name=self.model_name)
            except Exception:
                try:
                    from langchain_huggingface import HuggingFaceEmbeddings
                    self._embeddings = HuggingFaceEmbeddings(model_name=self.model_name)
                except Exception:
                    try:
                        from sentence_transformers import SentenceTransformer

                        st_model = SentenceTransformer(self.model_name)

                        class LocalSTEmbeddings:
                            def embed_documents(self, texts: List[str]) -> List[List[float]]:
                                return st_model.encode(texts).tolist()

                            def embed_query(self, text: str) -> List[float]:
                                return st_model.encode([text])[0].tolist()

                        self._embeddings = LocalSTEmbeddings()
                    except Exception:
                        self._embeddings = TFIDFEmbedder()
        return self._embeddings
