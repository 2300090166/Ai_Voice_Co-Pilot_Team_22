from app.agents.base_agent import BaseAgent
from typing import Dict, Any, List


class PerformanceInsightsAgent(BaseAgent):
    """
    7. Performance Insights Agent (AI Sales Coaching Engine)
    Evaluates completed customer turns and conversation context to produce
    sales performance metrics: Sales Score (0-100), Interest Level, Conversation Quality,
    Conversion Probability, Strengths, Improvement Areas, and AI Coaching Suggestions.
    """

    def __init__(self):
        super().__init__(agent_name="PerformanceInsightsAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Processes conversation context and returns structured insights JSON:
        {
          "sales_score": 91,
          "interest_level": "High",
          "conversation_quality": "Excellent",
          "conversion_probability": 87,
          "strengths": [...],
          "improvements": [...],
          "suggestions": [...]
        }
        """
        query = context.get("query", "").lower()
        knowledge = context.get("knowledge_output", {})
        recommendations = context.get("recommendation_output", {}).get("recommendations", [])
        crm_data = context.get("crm_output", {})
        confidence = knowledge.get("confidence", 0.95)

        # 1. Calculate Base Sales Score & Conversion Probability
        crm_score = crm_data.get("interest_score", 87)
        sales_score = min(100, max(50, int(crm_score * 0.7 + (confidence * 100) * 0.3)))
        conversion_probability = min(98, max(30, int(sales_score * 0.95)))

        # 2. Derive Quality Category
        if sales_score >= 88:
            conversation_quality = "Excellent"
            interest_level = "High"
        elif sales_score >= 75:
            conversation_quality = "Good"
            interest_level = "High" if "kyc" not in query else "Medium"
        elif sales_score >= 60:
            conversation_quality = "Average"
            interest_level = "Medium"
        else:
            conversation_quality = "Needs Improvement"
            interest_level = "Low"

        # 3. Generate Contextual Strengths
        strengths: List[str] = [
            "Explained Pay-in-3 zero-cost EMI terms clearly",
            "Grounded answers strictly in verified company knowledge base",
            "Maintained compliant and professional sales tone"
        ]

        if "student" in query:
            strengths.append("Addressed student debit card eligibility criteria accurately")

        # 4. Generate Areas for Improvement
        improvements: List[str] = []
        if "offer" not in query and "cashback" not in query:
            improvements.append("Mention promotional cashback offers earlier in the call")
        if "grace" not in query:
            improvements.append("Highlight 3-day penalty-free grace period to ease customer hesitation")
        if not improvements:
            improvements.append("Proactively confirm if customer needs instant digital application link")

        # 5. Formulate AI Coaching Suggestions
        suggestions: List[str] = []
        if recommendations and len(recommendations) > 0:
            for r in recommendations[:2]:
                suggestions.append(r.get("title", "Offer Application Link"))
        if "Send product brochure" not in suggestions:
            suggestions.append("Send product brochure")

        return {
          "sales_score": sales_score,
          "interest_level": interest_level,
          "conversation_quality": conversation_quality,
          "conversion_probability": conversion_probability,
          "strengths": strengths,
          "improvements": improvements,
          "suggestions": suggestions
        }
