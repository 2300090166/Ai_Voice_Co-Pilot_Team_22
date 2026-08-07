"""
Data Access Repositories Package
"""
from app.database.repositories.call_repo import CallRepository
from app.database.repositories.crm_repo import CRMRepository

__all__ = ["CallRepository", "CRMRepository"]
