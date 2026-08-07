from pydantic import BaseModel
from typing import Optional


class AudioChunkPayload(BaseModel):
    session_id: str
    chunk_index: int
    audio_base64: str


class TranscriptionResponse(BaseModel):
    session_id: str
    chunk_index: int
    transcript: str
    is_final: bool = False
