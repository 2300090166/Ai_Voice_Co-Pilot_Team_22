from app.database.connection import Base
from sqlalchemy import Column, String, Integer, Text, DateTime
from datetime import datetime


class CRMRecord(Base):
    """
    CRM Lead & Disposition Record ORM Entity Placeholder.
    """
    __tablename__ = "crm_records"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String, index=True)
    disposition = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
