"""
Speech-to-Text Processing Package
Includes OpenAI Whisper engine interface and audio stream chunk decoder.
"""
from app.speech.whisper_stt import WhisperSTT
from app.speech.stream_handler import AudioStreamHandler

__all__ = ["WhisperSTT", "AudioStreamHandler"]
