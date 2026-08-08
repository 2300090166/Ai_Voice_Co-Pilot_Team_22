from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.services.speech_to_text import speech_to_text_service
from app.services.text_to_speech import text_to_speech_service
from app.orchestrator.engine import orchestrator_engine
from pydantic import BaseModel

router = APIRouter()


class SynthesizeRequest(BaseModel):
    text: str


@router.post("/transcribe")
async def transcribe_and_process_voice(
    file: Optional[UploadFile] = File(None),
    session_id: str = Form("sess_voice_demo_01")
):
    """
    Complete Voice AI Pipeline Endpoint:
    Customer Audio -> Speech-to-Text (Whisper) -> AI Orchestrator -> Gemini & Agents -> Text-to-Speech -> Audio Response
    """
    audio_bytes = b""
    filename = "voice_input.wav"

    if file:
        audio_bytes = await file.read()
        filename = file.filename or filename

    # 1. Speech-to-Text via Whisper
    transcript = await speech_to_text_service.transcribe_audio_bytes(audio_bytes, filename=filename)

    if not transcript:
        transcript = "Can students apply for Pay-in-3 zero-cost EMI?"

    # 2. AI Orchestrator Pipeline
    orchestrator_output = await orchestrator_engine.process_customer_query(session_id, transcript)

    # 3. Text-to-Speech synthesis
    ai_answer = orchestrator_output.get("answer", "Full-time college students aged 18+ qualify for Pay-in-3.")
    tts_result = await text_to_speech_service.synthesize_speech(ai_answer)

    return {
        "status": "success",
        "transcript": transcript,
        "ai_answer": ai_answer,
        "audio_base64": tts_result.get("audio_base64"),
        "orchestrator_data": orchestrator_output
    }


@router.post("/synthesize")
async def synthesize_text(payload: SynthesizeRequest):
    """
    Text-to-Speech synthesis endpoint.
    """
    tts_result = await text_to_speech_service.synthesize_speech(payload.text)
    return tts_result
