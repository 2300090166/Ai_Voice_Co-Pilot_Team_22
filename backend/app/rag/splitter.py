from typing import List
from app.rag.loader import Document

try:
    from langchain_text_splitters import RecursiveCharacterTextSplitter
except ImportError:
    try:
        from langchain.text_splitter import RecursiveCharacterTextSplitter
    except ImportError:
        class RecursiveCharacterTextSplitter:
            def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50, separators: List[str] = None):
                self.chunk_size = chunk_size
                self.chunk_overlap = chunk_overlap

            def split_documents(self, documents: List[Document]) -> List[Document]:
                chunks = []
                for doc in documents:
                    text = doc.page_content
                    start = 0
                    while start < len(text):
                        end = start + self.chunk_size
                        chunk_text = text[start:end]
                        chunks.append(Document(page_content=chunk_text, metadata=doc.metadata))
                        start += (self.chunk_size - self.chunk_overlap)
                return chunks


class DocumentSplitter:
    """
    Document splitter passage generator.
    Splits raw Documents into search-ready chunks using RecursiveCharacterTextSplitter.
    """

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", "Q:", "A:", ". ", " ", ""]
        )

    def split_documents(self, documents: List[Document]) -> List[Document]:
        """
        Split list of documents into passages.
        """
        if not documents:
            return []
        return self.splitter.split_documents(documents)
