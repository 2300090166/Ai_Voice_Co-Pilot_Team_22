from fastapi import APIRouter
from app.config import settings

router = APIRouter()


@router.get("/")
async def health_check():
    """
    Application Health Check Endpoint.
    """
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }
