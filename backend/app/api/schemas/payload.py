from pydantic import BaseModel, Field
from typing import Dict, Any, Optional


class ProcessTurnRequest(BaseModel):
    session_id: str = Field(default="session_demo_01", description="Unique call session ID")
    query: str = Field(default="Does Pay-in-3 have zero interest?", description="Customer transcript turn or query")


class ProcessTurnResponse(BaseModel):
    intent: Dict[str, Any]
    emotion: Dict[str, Any]
    knowledge: Dict[str, Any]
    recommendation: Dict[str, Any]
    compliance: Dict[str, Any]
    crm: Dict[str, Any]
    evaluation: Dict[str, Any]
