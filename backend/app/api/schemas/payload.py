from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


class RecommendationItem(BaseModel):
    title: str = Field(..., description="Recommendation Action Title")
    priority: str = Field(..., description="Priority: High, Medium, Low")
    reason: str = Field(..., description="Contextual reason for sales rep")


class ProcessTurnRequest(BaseModel):
    session_id: str = Field(default="session_demo_01", description="Unique call session ID")
    query: str = Field(default="Can students apply for Pay-in-3?", description="Customer transcript turn or query")


class ProcessTurnResponse(BaseModel):
    answer: str
    intent: str
    recommendations: List[RecommendationItem]
    sources: List[str]
    confidence: float
