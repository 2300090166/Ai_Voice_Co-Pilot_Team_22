from app.agents.base_agent import BaseAgent
from typing import Dict, Any


class IntentAgent(BaseAgent):
    """
    1. Intent Agent
    Classifies customer intent during Pay-in-3 EMI sales conversations.
    """

    def __init__(self):
        super().__init__(agent_name="IntentAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process customer query and determine intent.
        """
        query = context.get("query", "")
        # Placeholder response format specified in requirements
        return {
            "intent": "EMI_INFORMATION"
        }
