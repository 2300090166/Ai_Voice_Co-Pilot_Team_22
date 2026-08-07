from app.agents.base_agent import BaseAgent
from typing import Dict, Any


class RecommendationAgent(BaseAgent):
    """
    4. Recommendation Agent
    Suggests Next-Best Actions (NBAs), pitch guidance, and objection handlers.
    """

    def __init__(self):
        super().__init__(agent_name="RecommendationAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Formulate next best actions based on intent, emotion, and RAG knowledge.
        """
        # Placeholder response format specified in requirements
        return {
            "next_action": "Explain Pay-in-3 Benefits"
        }
