from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseAgent(ABC):
    """
    Abstract Base Class for all AI Agents in the system.
    Enforces clean code architecture, modular design, and SOLID principles.
    Every agent must expose the common `async def process(self, context: Dict[str, Any]) -> Dict[str, Any]` interface.
    """

    def __init__(self, agent_name: str):
        self.agent_name = agent_name

    @abstractmethod
    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process incoming conversation context and return structured agent response.
        """
        pass
