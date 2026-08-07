from app.database.connection import Base
from sqlalchemy import Column, String, Integer, Boolean, DateTime
from datetime import datetime


class ComplianceAudit(Base):
    """
    Compliance Audit Record ORM Entity Placeholder.
    """
    __tablename__ = "compliance_audits"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    rule_id = Column(String)
    is_compliant = Column(Boolean, default=True)
    audited_at = Column(DateTime, default=datetime.utcnow)
