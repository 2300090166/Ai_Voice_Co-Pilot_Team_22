from typing import Dict, Any
from app.agents import (
    IntentAgent,
    EmotionAgent,
    KnowledgeRAGAgent,
    RecommendationAgent,
    ComplianceAgent,
    CRMAgent,
    SelfEvaluationAgent,
)


class AgentWorkflow:
    """
    Defines the sequential execution workflow for the 7 specialized AI agents:
    Intent Agent -> Emotion Agent -> Knowledge Agent -> Recommendation Agent -> Compliance Agent -> CRM Agent -> Self Evaluation Agent
    """

    def __init__(self):
        # Instantiate 7 specialized agents
        self.intent_agent = IntentAgent()
        self.emotion_agent = EmotionAgent()
        self.knowledge_agent = KnowledgeRAGAgent()
        self.recommendation_agent = RecommendationAgent()
        self.compliance_agent = ComplianceAgent()
        self.crm_agent = CRMAgent()
        self.evaluation_agent = SelfEvaluationAgent()

    async def run_pipeline(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes agents in strict sequence, accumulating context at each step.
        Returns a single combined JSON response matching requirements.
        """
        # 1. Intent Agent
        intent_res = await self.intent_agent.process(context)
        context["intent_output"] = intent_res

        # 2. Emotion Agent
        emotion_res = await self.emotion_agent.process(context)
        context["emotion_output"] = emotion_res

        # 3. Knowledge Agent
        knowledge_res = await self.knowledge_agent.process(context)
        context["knowledge_output"] = knowledge_res

        # 4. Recommendation Agent
        recommendation_res = await self.recommendation_agent.process(context)
        context["recommendation_output"] = recommendation_res

        # 5. Compliance Agent
        compliance_res = await self.compliance_agent.process(context)
        context["compliance_output"] = compliance_res

        # 6. CRM Agent
        crm_res = await self.crm_agent.process(context)
        context["crm_output"] = crm_res

        # 7. Self Evaluation Agent
        evaluation_res = await self.evaluation_agent.process(context)
        context["evaluation_output"] = evaluation_res

        # Aggregate final combined response format as specified
        combined_response = {
            "intent": intent_res,
            "emotion": emotion_res,
            "knowledge": knowledge_res,
            "recommendation": recommendation_res,
            "compliance": compliance_res,
            "crm": crm_res,
            "evaluation": evaluation_res
        }

        return combined_response
