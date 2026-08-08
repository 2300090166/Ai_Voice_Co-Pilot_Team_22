from fastapi import APIRouter, HTTPException
from app.api.schemas.crm import CRMSummaryResponse, CRMSummaryRequest
from app.orchestrator.workflow import crm_memory_store
from app.agents.crm_agent import CRMAgent

router = APIRouter()
crm_agent_engine = CRMAgent()


@router.get("/summary/{session_id}", response_model=CRMSummaryResponse)
async def get_crm_summary(session_id: str):
    """
    Retrieve latest generated CRM summary record for a session from in-memory cache.
    """
    if session_id in crm_memory_store:
        return crm_memory_store[session_id]

    # Return default initialized record if session not in memory yet
    default_record = await crm_agent_engine.process({"query": "Can students apply for Pay-in-3?"})
    crm_memory_store[session_id] = default_record
    return default_record


@router.post("/summary", response_model=CRMSummaryResponse)
async def generate_crm_summary(payload: CRMSummaryRequest):
    """
    Generate or recalculate CRM summary record on demand.
    """
    context = {"query": payload.query or "Pay-in-3 zero cost EMI eligibility"}
    crm_record = await crm_agent_engine.process(context)
    crm_memory_store[payload.session_id] = crm_record
    return crm_record
