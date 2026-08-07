from pydantic import BaseModel
from typing import Dict, Any, List, Optional


class AgentResponseSchema(BaseModel):
    agent_name: str
    status: str
    data: Dict[str, Any]
