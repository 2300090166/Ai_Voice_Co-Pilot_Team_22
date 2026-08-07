from app.agents.base_agent import BaseAgent
from typing import Dict, Any


class ComplianceAgent(BaseAgent):
    """
    5. Compliance Agent
    Monitors mandatory disclosures (zero interest conditions, late fee rules, soft credit checks).
    """

    def __init__(self):
        super().__init__(agent_name="ComplianceAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Audit mandatory financial disclosures.
        """
        # Placeholder response format specified in requirements
        return {
            "status": "approved"
        }
