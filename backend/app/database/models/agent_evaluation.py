from app.database.connection import Base
from sqlalchemy import Column, String, Integer, Float, DateTime
from datetime import datetime


class AgentEvaluation(Base):
    """
    Post-Call Self Evaluation ORM Entity Placeholder.
    """
    __tablename__ = "agent_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    overall_score = Column(Float)
    script_adherence_score = Column(Float)
    evaluated_at = Column(DateTime, default=datetime.utcnow)
