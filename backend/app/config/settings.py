from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """
    Application Settings loaded from environment variables.
    """
    PROJECT_NAME: str = "AI Voice Co-Pilot for Inside Sales"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "ai_voice_copilot"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: Optional[str] = None

    # AI Models Config Placeholder
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"
    FAISS_INDEX_PATH: str = "vector_store_data"
    EMBEDDING_MODEL_NAME: str = "all-MiniLM-L6-v2"
    WHISPER_MODEL_SIZE: str = "base"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
