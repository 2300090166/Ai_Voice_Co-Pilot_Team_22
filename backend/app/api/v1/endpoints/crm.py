from fastapi import APIRouter

router = APIRouter()


@router.get("/leads/{lead_id}")
async def get_lead_info(lead_id: str):
    """
    Fetch customer lead profile and loan history.
    (Placeholder handler)
    """
    return {"lead_id": lead_id, "status": "placeholder"}


@router.post("/leads/{lead_id}/summary")
async def generate_crm_summary(lead_id: str):
    """
    Auto-generate post-call CRM disposition and summary.
    (Placeholder handler)
    """
    return {"lead_id": lead_id, "summary": "placeholder"}
