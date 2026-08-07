import os
from typing import Dict, Any
from app.rag.loader import KnowledgeBaseLoader
from app.rag.splitter import DocumentSplitter
from app.rag.vector_store import VectorStoreManager
from app.rag.retrieval import RetrievalService


class RAGService:
    """
    Unified RAG Service orchestrating document loading, chunk splitting,
    FAISS vector index initialization, and context retrieval.
    """

    def __init__(self):
        # Resolve absolute path to knowledge_base in root directory
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        knowledge_base_dir = os.path.join(os.path.dirname(base_dir), "knowledge_base")
        if not os.path.exists(knowledge_base_dir):
            knowledge_base_dir = os.path.join(base_dir, "..", "knowledge_base")

        self.knowledge_base_dir = os.path.abspath(knowledge_base_dir)
        self.loader = KnowledgeBaseLoader(knowledge_base_dir=self.knowledge_base_dir)
        self.splitter = DocumentSplitter(chunk_size=500, chunk_overlap=50)
        self.vector_store_manager = VectorStoreManager()
        self.retrieval_service = RetrievalService(self.vector_store_manager)

        self._initialized = False

    def initialize(self):
        """
        Load knowledge_base documents, split into chunks, and index into FAISS.
        """
        if self._initialized:
            return

        documents = self.loader.load_documents()
        chunks = self.splitter.split_documents(documents)
        self.vector_store_manager.build_or_load_index(chunks)
        self._initialized = True

    def query(self, question: str, top_k: int = 3) -> Dict[str, Any]:
        """
        Queries FAISS vector index and returns retrieved documents and confidence score.
        """
        if not self._initialized:
            self.initialize()

        return self.retrieval_service.search(question, top_k=top_k)


# Singleton RAG Service Instance
rag_service = RAGService()
