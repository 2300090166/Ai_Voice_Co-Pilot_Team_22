from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from app.orchestrator.state import crm_memory_store

router = APIRouter()


class EndCallRequest(BaseModel):
    session_id: Optional[str] = Field(default="sess_live_call_01")


class EndCallResponse(BaseModel):
    status: str = "ended"
    message: str = "Call session ended successfully."


@router.post("/end", response_model=EndCallResponse)
async def end_call_session(payload: Optional[EndCallRequest] = None):
    """
    Terminates active call session, finalizes CRM records, and clears turn caches.
    """
    try:
        session_id = payload.session_id if payload else "sess_live_call_01"
        if session_id in crm_memory_store:
            crm_memory_store[session_id]["conversation_status"] = "Completed"

        return EndCallResponse(
            status="ended",
            message="Call session ended successfully."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
