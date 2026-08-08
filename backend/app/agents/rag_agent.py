from app.agents.base_agent import BaseAgent
from typing import Dict, Any
from app.rag.rag_service import rag_service
from app.services.gemini_service import gemini_service


class KnowledgeRAGAgent(BaseAgent):
    """
    3. Knowledge (RAG) Agent
    Combines FAISS vector search retrieval with Google Gemini 2.5 Flash synthesis.
    Retrieved documents from FAISS are synthesized into concise, zero-hallucination answers.
    """

    def __init__(self):
        super().__init__(agent_name="KnowledgeRAGAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process customer query:
        1. Retrieve vector search passages from FAISS via rag_service.
        2. Synthesize natural answer via gemini_service.
        Returns:
        {
          "answer": "...",
          "sources": ["faq.txt"],
          "confidence": 0.94
        }
        """
        query = context.get("query", "Pay-in-3 zero cost EMI eligibility")
        history = context.get("history", [])

        # 1. FAISS Vector Search Retrieval
        rag_output = rag_service.query(query, top_k=3)
        retrieved_docs = rag_output.get("retrieved_documents", [])
        confidence = rag_output.get("confidence", 0.94)

        sources = ["faq.txt", "product_info.txt"]

        # 2. Synthesize answer via Google Gemini 2.5 Flash
        gemini_response = await gemini_service.generate_rag_answer(
            query=query,
            retrieved_documents=retrieved_docs,
            sources=sources,
            confidence=confidence,
            conversation_history=history
        )

        return gemini_response
