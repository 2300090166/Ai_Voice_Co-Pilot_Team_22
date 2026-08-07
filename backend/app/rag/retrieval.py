import math
from typing import Dict, Any, List
from app.rag.vector_store import VectorStoreManager


class RetrievalService:
    """
    Retrieval Service executing vector similarity search against FAISS
    and formatting relevant passages & confidence score.
    """

    def __init__(self, vector_store_manager: VectorStoreManager):
        self.vector_store_manager = vector_store_manager

    def search(self, query: str, top_k: int = 3) -> Dict[str, Any]:
        """
        Executes query against FAISS vector store.
        Returns:
        {
          "retrieved_documents": [...],
          "confidence": 0.94
        }
        """
        results = self.vector_store_manager.similarity_search_with_score(query, k=top_k)

        if not results:
            return {
                "retrieved_documents": [],
                "confidence": 0.0
            }

        retrieved_texts: List[str] = []
        scores: List[float] = []

        for doc, score in results:
            retrieved_texts.append(doc.page_content.strip())
            # Convert L2 distance score to confidence score [0.0, 1.0]
            # Lower distance means higher similarity
            sim = 1.0 / (1.0 + float(score))
            scores.append(sim)

        avg_confidence = round(sum(scores) / len(scores), 2) if scores else 0.90
        # Cap confidence between 0.50 and 0.99 for valid query matches
        confidence = max(0.50, min(0.99, avg_confidence))

        return {
            "retrieved_documents": retrieved_texts,
            "confidence": confidence
        }
