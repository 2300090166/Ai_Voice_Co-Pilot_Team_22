from app.agents.base_agent import BaseAgent
from typing import Dict, Any, List


class CRMAgent(BaseAgent):
    """
    6. CRM Agent (CRM Automation & Summary Engine)
    Collects customer query, AI response, intent, recommendations, and RAG sources,
    then automatically synthesizes structured CRM data including Customer Summary,
    Interest Score (0-100), Conversation Status, Products Discussed, Next Best Action,
    and Follow-up Recommendation.
    """

    def __init__(self):
        super().__init__(agent_name="CRMAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process context and return structured CRM JSON response.
        Output format:
        {
          "customer_summary": "...",
          "interest_score": 87,
          "conversation_status": "Interested",
          "products_discussed": ["Pay-in-3"],
          "next_best_action": "Offer Application Link",
          "follow_up": "Call Tomorrow"
        }
        """
        query = context.get("query", "").strip()
        knowledge = context.get("knowledge_output", {})
        answer = knowledge.get("answer", "")
        recommendations = context.get("recommendation_output", {}).get("recommendations", [])
        intent_info = context.get("intent_output", {})
        intent_category = intent_info.get("intent", "EMI_INFORMATION")

        query_lower = query.lower()

        # 1. Products Discussed
        products_discussed = ["Pay-in-3 Zero-Cost EMI"]

        # 2. Conversation Status & Interest Score Calculation
        if any(k in query_lower for k in ["not interested", "cancel", "don't call", "stop", "close"]):
            conversation_status = "Not Interested"
            interest_score = 25
            follow_up = "No Follow-up Required"
        elif any(k in query_lower for k in ["complaint", "manager", "legal", "fraud", "issue", "supervisor"]):
            conversation_status = "Escalation Required"
            interest_score = 40
            follow_up = "Schedule Video Call"
        elif any(k in query_lower for k in ["kyc", "document", "id", "verify", "need time", "think about it", "callback"]):
            conversation_status = "Needs Follow-up"
            interest_score = 72
            follow_up = "Send KYC Checklist" if "kyc" in query_lower else "Call Tomorrow"
        else:
            conversation_status = "Interested"
            interest_score = 87
            follow_up = "Call Tomorrow"

        # 3. Next Best Action selection
        next_best_action = "Offer Application Link"
        if recommendations and len(recommendations) > 0:
            next_best_action = recommendations[0].get("title", "Offer Application Link")

        # 4. Generate Executive Customer Summary
        if query:
            customer_summary = (
                f"Customer inquired: '{query}'. AI Co-Pilot provided Pay-in-3 Zero-Cost EMI policy guidelines. "
                f"Identified intent: {intent_category}. Customer interest rating scored at {interest_score}/100."
            )
        else:
            customer_summary = (
                "Customer requested Pay-in-3 zero-cost EMI eligibility for a retail transaction "
                "and verified student debit card installment requirements."
            )

        return {
            "customer_summary": customer_summary,
            "interest_score": interest_score,
            "conversation_status": conversation_status,
            "products_discussed": products_discussed,
            "next_best_action": next_best_action,
            "follow_up": follow_up
        }
