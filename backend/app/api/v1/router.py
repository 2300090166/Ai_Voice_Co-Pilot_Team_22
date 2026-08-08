from fastapi import APIRouter
from app.api.v1.endpoints.copilot import router as copilot_router
from app.api.v1.endpoints.audio import router as audio_router
from app.api.v1.endpoints.crm import router as crm_router
from app.api.v1.endpoints.analytics import router as analytics_router
from app.api.v1.endpoints.call import router as call_router

api_router = APIRouter()

api_router.include_router(copilot_router, prefix="/copilot", tags=["Copilot"])
api_router.include_router(audio_router, prefix="/audio", tags=["Voice Audio"])
api_router.include_router(crm_router, prefix="/crm", tags=["CRM Automation"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics Dashboard"])
api_router.include_router(call_router, prefix="/call", tags=["Call Session Control"])
