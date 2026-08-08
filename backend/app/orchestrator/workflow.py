from typing import Dict, Any
from app.agents import (
    IntentAgent,
    EmotionAgent,
    KnowledgeRAGAgent,
    RecommendationAgent,
    ComplianceAgent,
    CRMAgent,
    SelfEvaluationAgent,
    PerformanceInsightsAgent,
)
from app.orchestrator.state import crm_memory_store


class AgentWorkflow:
    """
    Defines the sequential execution workflow for the AI Voice Co-Pilot:
    Customer Query -> Knowledge Agent -> Gemini -> Recommendation Agent -> CRM Agent -> Performance Insights Agent
    """

    def __init__(self):
        self.intent_agent = IntentAgent()
        self.emotion_agent = EmotionAgent()
        self.knowledge_agent = KnowledgeRAGAgent()
        self.recommendation_agent = RecommendationAgent()
        self.compliance_agent = ComplianceAgent()
        self.crm_agent = CRMAgent()
        self.performance_insights_agent = PerformanceInsightsAgent()
        self.evaluation_agent = SelfEvaluationAgent()

    async def run_pipeline(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes complete multi-agent pipeline and returns combined turn response.
        """
        session_id = context.get("session_id", "session_default")

        # 1. Intent Agent
        intent_res = await self.intent_agent.process(context)
        context["intent_output"] = intent_res

        # 2. Emotion Agent
        emotion_res = await self.emotion_agent.process(context)
        context["emotion_output"] = emotion_res

        # 3. Knowledge Agent + Gemini Synthesis
        knowledge_res = await self.knowledge_agent.process(context)
        context["knowledge_output"] = knowledge_res

        # 4. Recommendation Agent
        recommendation_res = await self.recommendation_agent.process(context)
        context["recommendation_output"] = recommendation_res

        # 5. Compliance Agent
        compliance_res = await self.compliance_agent.process(context)
        context["compliance_output"] = compliance_res

        # 6. CRM Agent (Automation Summary)
        crm_res = await self.crm_agent.process(context)
        context["crm_output"] = crm_res
        crm_memory_store[session_id] = crm_res

        # 7. Performance Insights Agent (Sales Coaching Engine)
        insights_res = await self.performance_insights_agent.process(context)
        context["insights_output"] = insights_res

        # 8. Self Evaluation Agent
        evaluation_res = await self.evaluation_agent.process(context)
        context["evaluation_output"] = evaluation_res

        # Extract values for turn response format
        answer_str = knowledge_res.get("answer", "No answer generated.")
        sources_list = knowledge_res.get("sources", ["knowledge_base"])
        confidence_val = knowledge_res.get("confidence", 0.95)
        intent_category = intent_res.get("intent", "EMI_INFORMATION")
        rec_list = recommendation_res.get("recommendations", [])

        combined_response = {
            "answer": answer_str,
            "intent": intent_category,
            "recommendations": rec_list,
            "sources": sources_list,
            "confidence": confidence_val,
            "crm": crm_res,
            "insights": insights_res,
            "intent_data": intent_res,
            "emotion_data": emotion_res,
            "knowledge_data": knowledge_res,
            "recommendation_data": recommendation_res,
            "compliance_data": compliance_res,
            "crm_data": crm_res,
            "insights_data": insights_res,
            "evaluation_data": evaluation_res
        }

        return combined_response
