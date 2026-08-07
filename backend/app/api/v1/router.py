from fastapi import APIRouter
from app.api.v1.endpoints import health, audio, copilot, crm, analytics

api_router = APIRouter()

api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(audio.router, prefix="/audio", tags=["Audio Stream"])
api_router.include_router(copilot.router, prefix="/copilot", tags=["Co-Pilot Orchestration"])
api_router.include_router(crm.router, prefix="/crm", tags=["CRM"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics & Evaluation"])
