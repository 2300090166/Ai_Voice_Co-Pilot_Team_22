import os
import math
from typing import List, Tuple, Any
from app.rag.loader import Document
from app.rag.embeddings import EmbeddingManager


class VectorStoreManager:
    """
    FAISS Vector Store Manager for Pay-in-3 Knowledge Base.
    Handles indexing, similarity search with distance scores, and local index persistence.
    """

    def __init__(self, index_dir: str = "vector_store_data"):
        self.index_dir = os.path.abspath(index_dir)
        self.embedding_manager = EmbeddingManager()
        self.vector_store = None
        self._fallback_docs: List[Document] = []
        self._fallback_embeddings = []

    def build_or_load_index(self, documents: List[Document]) -> Any:
        """
        Build vector index from document passages or load from local storage.
        """
        embeddings_model = self.embedding_manager.get_embeddings_model()

        if documents:
            self._fallback_docs = documents

        # Attempt LangChain FAISS load/build
        try:
            from langchain_community.vectorstores import FAISS
            if documents:
                self.vector_store = FAISS.from_documents(documents, embeddings_model)
                try:
                    os.makedirs(self.index_dir, exist_ok=True)
                    self.vector_store.save_local(self.index_dir)
                except Exception:
                    pass
            elif os.path.exists(self.index_dir):
                try:
                    self.vector_store = FAISS.load_local(
                        self.index_dir,
                        embeddings_model,
                        allow_dangerous_deserialization=True
                    )
                except Exception:
                    pass
            return self.vector_store
        except Exception as e:
            print(f"[VectorStoreManager] FAISS build fallback: {e}")
            if documents:
                texts = [d.page_content for d in documents]
                if hasattr(embeddings_model, "embed_documents"):
                    self._fallback_embeddings = embeddings_model.embed_documents(texts)
            return self

    def similarity_search_with_score(self, query: str, k: int = 3) -> List[Tuple[Document, float]]:
        """
        Perform similarity search on vector store returning (document, distance_score) tuples.
        """
        if self.vector_store is not None:
            try:
                return self.vector_store.similarity_search_with_score(query, k=k)
            except Exception as e:
                print(f"[VectorStoreManager] Similarity search warning: {e}")

        if not self._fallback_docs:
            return []

        embeddings_model = self.embedding_manager.get_embeddings_model()
        if not self._fallback_embeddings:
            texts = [d.page_content for d in self._fallback_docs]
            if hasattr(embeddings_model, "embed_documents"):
                self._fallback_embeddings = embeddings_model.embed_documents(texts)

        if hasattr(embeddings_model, "embed_query"):
            query_vec = embeddings_model.embed_query(query)
        else:
            return []

        import numpy as np
        q_vec = np.array(query_vec)
        scored = []
        for doc, emb in zip(self._fallback_docs, self._fallback_embeddings):
            e_vec = np.array(emb)
            denom = (np.linalg.norm(q_vec) * np.linalg.norm(e_vec))
            sim = float(np.dot(q_vec, e_vec) / (denom if denom != 0 else 1.0))
            dist = 1.0 - sim
            scored.append((doc, dist))

        scored.sort(key=lambda x: x[1])
        return scored[:k]
