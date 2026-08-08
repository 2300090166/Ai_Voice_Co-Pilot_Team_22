from fastapi import APIRouter
from app.services.analytics_service import analytics_service

router = APIRouter()


@router.get("/dashboard")
async def get_analytics_dashboard():
    """
    Returns complete aggregated analytics JSON metrics for sales managers:
    Total Conversations, Active Calls, Average Sales Score, Intent Distribution,
    Customer Interest breakdown, Quality distribution, Conversion Probability,
    AI System Usage metrics, and Recent Conversations table.
    """
    return await analytics_service.get_dashboard_analytics()
