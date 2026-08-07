from fastapi import APIRouter, HTTPException
from app.api.schemas.payload import ProcessTurnRequest, ProcessTurnResponse
from app.orchestrator.engine import orchestrator_engine

router = APIRouter()


@router.post("/process-turn", response_model=ProcessTurnResponse)
async def process_customer_turn(payload: ProcessTurnRequest):
    """
    Process incoming customer query through the Antigravity AI Orchestrator.
    Executes the 7 specialized agents sequentially:
    Intent Agent -> Emotion Agent -> Knowledge Agent -> Recommendation Agent -> Compliance Agent -> CRM Agent -> Self Evaluation Agent
    """
    try:
        result = await orchestrator_engine.process_customer_query(
            session_id=payload.session_id,
            query=payload.query
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
