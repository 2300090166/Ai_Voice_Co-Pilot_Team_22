"""
Multi-Agent Framework Package
Contains all 7 domain agents:
1. Intent Agent
2. Emotion Agent
3. Knowledge (RAG) Agent
4. Recommendation Agent
5. Compliance Agent
6. CRM Agent
7. Self Evaluation Agent
"""
from app.agents.base_agent import BaseAgent
from app.agents.intent_agent import IntentAgent
from app.agents.emotion_agent import EmotionAgent
from app.agents.rag_agent import KnowledgeRAGAgent
from app.agents.recommendation_agent import RecommendationAgent
from app.agents.compliance_agent import ComplianceAgent
from app.agents.crm_agent import CRMAgent
from app.agents.self_evaluation_agent import SelfEvaluationAgent

__all__ = [
    "BaseAgent",
    "IntentAgent",
    "EmotionAgent",
    "KnowledgeRAGAgent",
    "RecommendationAgent",
    "ComplianceAgent",
    "CRMAgent",
    "SelfEvaluationAgent",
]
