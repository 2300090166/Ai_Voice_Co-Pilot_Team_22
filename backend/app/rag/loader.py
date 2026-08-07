import os
from glob import glob
from typing import List, Dict, Any

try:
    from langchain_core.documents import Document
except ImportError:
    class Document:
        def __init__(self, page_content: str, metadata: Dict[str, Any] = None):
            self.page_content = page_content
            self.metadata = metadata or {}


class KnowledgeBaseLoader:
    """
    Document loader for Knowledge Base documents (.txt, .md, .json, .pdf).
    Scans knowledge_base directory and returns Document objects.
    """

    def __init__(self, knowledge_base_dir: str = "../knowledge_base"):
        self.knowledge_base_dir = os.path.abspath(knowledge_base_dir)

    def load_documents(self) -> List[Document]:
        """
        Load all documents from knowledge_base directory.
        """
        documents: List[Document] = []
        if not os.path.exists(self.knowledge_base_dir):
            return documents

        supported_extensions = ["*.txt", "*.md", "*.json", "*.pdf"]
        file_paths = []
        for ext in supported_extensions:
            file_paths.extend(glob(os.path.join(self.knowledge_base_dir, ext)))
            file_paths.extend(glob(os.path.join(self.knowledge_base_dir, "**", ext), recursive=True))

        file_paths = list(set(file_paths))

        for file_path in file_paths:
            ext = os.path.splitext(file_path)[1].lower()
            filename = os.path.basename(file_path)

            try:
                if ext == ".pdf":
                    try:
                        from langchain_community.document_loaders import PyPDFLoader
                        loader = PyPDFLoader(file_path)
                        docs = loader.load()
                        documents.extend(docs)
                    except Exception:
                        try:
                            import pypdf
                            reader = pypdf.PdfReader(file_path)
                            text_pages = [page.extract_text() for page in reader.pages if page.extract_text()]
                            full_text = "\n".join(text_pages)
                            if full_text.strip():
                                documents.append(Document(page_content=full_text, metadata={"source": filename}))
                        except Exception:
                            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                                text = f.read()
                            if text.strip():
                                documents.append(Document(page_content=text, metadata={"source": filename}))
                else:
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        text = f.read()
                    if text.strip():
                        documents.append(Document(page_content=text, metadata={"source": filename}))
            except Exception as e:
                print(f"[KnowledgeBaseLoader] Warning reading {filename}: {e}")

        return documents
