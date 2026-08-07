from app.agents.base_agent import BaseAgent
from typing import Dict, Any
from app.rag.rag_service import rag_service


class KnowledgeRAGAgent(BaseAgent):
    """
    3. Knowledge (RAG) Agent
    Queries FAISS vector store over Pay-in-3 knowledge base documents using Sentence Transformers embeddings.
    Retrieves the most relevant passages and confidence score.
    """

    def __init__(self):
        super().__init__(agent_name="KnowledgeRAGAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Processes customer query by performing FAISS similarity search.
        Returns:
        {
          "retrieved_documents": [...],
          "confidence": 0.94
        }
        """
        query = context.get("query", "Pay-in-3 zero cost EMI eligibility")
        rag_output = rag_service.query(query, top_k=3)
        return rag_output
