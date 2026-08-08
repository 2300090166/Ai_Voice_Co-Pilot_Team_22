from app.services.speech_to_text import speech_to_text_service


class WhisperSTT:
    """
    OpenAI Whisper Speech-To-Text transcription module.
    Delegates audio processing to the production SpeechToTextService.
    """

    def __init__(self, model_size: str = "base"):
        self.model_size = model_size

    async def transcribe_chunk(self, audio_bytes: bytes) -> str:
        return await speech_to_text_service.transcribe_audio_bytes(audio_bytes)
