from typing import Dict, Any
from app.orchestrator.workflow import AgentWorkflow
from app.orchestrator.state import ConversationTurnContext


class OrchestratorEngine:
    """
    Antigravity AI Orchestrator Engine.
    Central brain receiving customer queries, maintaining conversation context,
    and coordinating the sequential execution of specialized AI agents.
    """

    def __init__(self):
        self.workflow = AgentWorkflow()
        self.sessions: Dict[str, ConversationTurnContext] = {}

    async def process_customer_query(self, session_id: str, query: str) -> Dict[str, Any]:
        """
        Receives incoming customer query, manages session context, and executes the 7-agent workflow.
        Returns the combined structured JSON response from all agents.
        """
        # Retrieve or initialize session context
        if session_id not in self.sessions:
            self.sessions[session_id] = ConversationTurnContext(
                session_id=session_id,
                query=query
            )
        
        session_context = self.sessions[session_id]
        session_context.query = query
        session_context.history.append({"role": "customer", "content": query})

        context_payload = {
            "session_id": session_id,
            "query": query,
            "history": session_context.history
        }

        # Run 7-agent pipeline
        combined_result = await self.workflow.run_pipeline(context_payload)

        # Update session memory state
        session_context.agent_outputs = combined_result

        return combined_result


# Singleton Orchestrator Instance
orchestrator_engine = OrchestratorEngine()
