from app.database.connection import Base
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime


class CallSession(Base):
    """
    Call Session ORM Entity Placeholder.
    """
    __tablename__ = "call_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True)
    agent_id = Column(String, index=True)
    customer_phone = Column(String)
    status = Column(String, default="active")
    started_at = Column(DateTime, default=datetime.utcnow)
