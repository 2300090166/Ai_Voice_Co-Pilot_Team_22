from pydantic import BaseModel, Field
from typing import Optional, List


class CRMSummaryResponse(BaseModel):
    customer_summary: str = Field(..., description="Executive summary of customer conversation")
    interest_score: int = Field(..., description="Calculated interest score (0 to 100)")
    conversation_status: str = Field(..., description="Status: Interested, Needs Follow-up, Not Interested, Escalation Required")
    products_discussed: List[str] = Field(..., description="Array of products discussed")
    next_best_action: str = Field(..., description="Recommended next action")
    follow_up: str = Field(..., description="Follow-up recommendation action")


class CRMSummaryRequest(BaseModel):
    session_id: str = Field(default="session_demo_01")
    query: Optional[str] = Field(default="Can students apply for Pay-in-3?")
