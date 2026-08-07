from app.agents.base_agent import BaseAgent
from typing import Dict, Any


class EmotionAgent(BaseAgent):
    """
    2. Emotion Agent
    Detects customer emotional state, sentiment, and hesitation cues.
    """

    def __init__(self):
        super().__init__(agent_name="EmotionAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process context and analyze customer emotion.
        """
        # Placeholder response format specified in requirements
        return {
            "emotion": "Interested"
        }
