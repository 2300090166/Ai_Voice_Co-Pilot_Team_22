from pydantic import BaseModel
from typing import Optional, List


class CRMLeadResponse(BaseModel):
    lead_id: str
    customer_name: str
    phone: str
    loan_eligible_amount: float
    disposition: Optional[str] = None


class CRMSummaryRequest(BaseModel):
    session_id: str
    lead_id: str
    disposition: str
    notes: Optional[str] = None
