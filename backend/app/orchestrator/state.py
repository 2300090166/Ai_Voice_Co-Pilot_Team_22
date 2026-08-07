from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


class ConversationTurnContext(BaseModel):
    """
    State container maintaining conversation context across turns.
    Accumulates outputs from each agent in the sequential pipeline.
    """
    session_id: str
    query: str
    history: List[Dict[str, str]] = Field(default_factory=list)
    agent_outputs: Dict[str, Any] = Field(default_factory=dict)
