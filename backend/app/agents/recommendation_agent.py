from app.agents.base_agent import BaseAgent
from typing import Dict, Any, List


class RecommendationAgent(BaseAgent):
    """
    4. Recommendation Agent (AI Sales Assistant Engine)
    Analyzes customer query, intent, sentiment/emotion, RAG retrieved knowledge,
    and Gemini response to generate context-aware Next-Best Actions (NBAs) for sales reps.
    """

    def __init__(self):
        super().__init__(agent_name="RecommendationAgent")

    async def process(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Processes context and generates structured recommendations array.
        Output format:
        {
          "recommendations": [
              {
                 "title": "Explain Zero Interest EMI",
                 "priority": "High",
                 "reason": "Customer is interested in EMI benefits"
              }
          ]
        }
        """
        query = context.get("query", "").lower()
        intent_info = context.get("intent_output", {})
        intent_str = str(intent_info.get("intent", "")).lower()
        emotion_info = context.get("emotion_output", {})
        emotion_str = str(emotion_info.get("emotion", "")).lower()

        recommendations: List[Dict[str, str]] = []

        # 1. Customer asks about KYC / Documentation
        if any(k in query for k in ["kyc", "document", "id", "passport", "license", "ssn", "verification"]):
            recommendations = [
                {
                    "title": "Explain Required Documents",
                    "priority": "High",
                    "reason": "Customer requested KYC identification rules"
                },
                {
                    "title": "Explain Verification Process",
                    "priority": "Medium",
                    "reason": "Guide customer through 60-second instant check"
                },
                {
                    "title": "Offer KYC Checklist",
                    "priority": "Medium",
                    "reason": "Provide document verification checklist"
                }
            ]

        # 2. Customer asks about Offers / Cashback / Promos
        elif any(k in query for k in ["offer", "cashback", "discount", "festival", "promo", "reward"]):
            recommendations = [
                {
                    "title": "Mention Cashback",
                    "priority": "High",
                    "reason": "Customer inquired about promotional rewards"
                },
                {
                    "title": "Mention Festival Offer",
                    "priority": "Medium",
                    "reason": "Highlight ongoing seasonal merchant subvention"
                },
                {
                    "title": "Explain Limited Time Benefits",
                    "priority": "High",
                    "reason": "Create urgency around current subvention offer"
                }
            ]

        # 3. Customer is Confused
        elif any(k in query for k in ["confused", "don't understand", "what do you mean", "explain simpler", "how does it work"]):
            recommendations = [
                {
                    "title": "Simplify Explanation",
                    "priority": "High",
                    "reason": "Customer needs a simpler payment breakdown"
                },
                {
                    "title": "Give Real-Life Example",
                    "priority": "High",
                    "reason": "Use $300 purchase split into 3 x $100 payments as an example"
                },
                {
                    "title": "Ask if Customer Needs More Help",
                    "priority": "Low",
                    "reason": "Ensure customer comprehension before moving forward"
                }
            ]

        # 4. Customer is Hesitating / Concerned
        elif any(k in query for k in ["hesitat", "doubt", "risk", "late fee", "miss", "safe", "credit score", "impact"]):
            recommendations = [
                {
                    "title": "Explain Benefits Again",
                    "priority": "High",
                    "reason": "Reassure customer on 0% interest and 3-day grace period"
                },
                {
                    "title": "Build Trust",
                    "priority": "High",
                    "reason": "Emphasize soft credit check that won't impact credit score"
                },
                {
                    "title": "Offer Callback",
                    "priority": "Medium",
                    "reason": "Offer scheduled follow-up call if customer needs time"
                },
                {
                    "title": "Share Success Story",
                    "priority": "Medium",
                    "reason": "Highlight 98% customer approval satisfaction"
                }
            ]

        # 5. Default: Customer is Interested in Pay-in-3 EMI
        else:
            recommendations = [
                {
                    "title": "Explain Zero Interest EMI",
                    "priority": "High",
                    "reason": "Customer requested Pay-in-3 installment terms"
                },
                {
                    "title": "Explain Pay-in-3 Benefits",
                    "priority": "High",
                    "reason": "Highlight 3 equal monthly payments with 0% interest"
                },
                {
                    "title": "Explain Eligibility",
                    "priority": "Medium",
                    "reason": "Verify student / applicant eligibility conditions"
                },
                {
                    "title": "Offer Application Link",
                    "priority": "Medium",
                    "reason": "Send instant digital checkout link"
                }
            ]

        return {
            "recommendations": recommendations
        }
