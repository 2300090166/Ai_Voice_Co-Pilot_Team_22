from fastapi import APIRouter, WebSocket

router = APIRouter()


@router.post("/transcribe")
async def transcribe_audio():
    """
    Transcribe uploaded audio chunk via Whisper STT.
    (Placeholder handler)
    """
    return {"transcript": "", "status": "placeholder"}


@router.websocket("/stream")
async def audio_stream_websocket(websocket: WebSocket):
    """
    Bidirectional WebSocket stream for live call audio chunks.
    (Placeholder handler)
    """
    await websocket.accept()
    await websocket.send_json({"status": "connected"})
    await websocket.close()
