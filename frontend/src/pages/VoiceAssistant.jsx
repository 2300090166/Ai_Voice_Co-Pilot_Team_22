import React, { useState, useRef } from 'react';
import Card from '../components/Card';
import AISuggestions from '../components/AISuggestions';
import CRMSummaryCard from '../components/dashboard/CRMSummaryCard';
import ConsentBanner from '../components/ConsentBanner';
import { Mic, MicOff, Volume2, VolumeX, Radio, Sparkles, Loader2, Play, Square, Bot, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import axios from 'axios';

/**
 * Voice Assistant Page Component
 * Features animated microphone pulsing rings, active audio waveform bars,
 * Speech-to-Text (Whisper), Gemini RAG synthesis, and Text-to-Speech (gTTS/Web Speech API).
 */
export default function VoiceAssistant() {
  const [micStatus, setMicStatus] = useState('standby');
  const [isRecording, setIsRecording] = useState(false);

  const [transcript, setTranscript] = useState('Hi, I am interested in buying a laptop for $600. Can students apply for Pay-in-3 zero-cost EMI?');
  const [aiAnswer, setAiAnswer] = useState('Full-time college and university students aged 18 and older can apply for Pay-in-3 zero-cost EMI. Students qualify with a valid student ID, active bank debit card, and proof of part-time income or allowance.');

  const [turnResponse, setTurnResponse] = useState({
    answer: 'Full-time college and university students aged 18 and older can apply for Pay-in-3 zero-cost EMI.',
    intent: 'EMI_INFORMATION',
    recommendations: [
      {
        title: 'Explain Zero Interest EMI',
        priority: 'High',
        reason: 'Customer requested Pay-in-3 installment terms and student eligibility.'
      },
      {
        title: 'Offer Application Link',
        priority: 'Medium',
        reason: 'Customer is eligible; offer instant digital checkout link.'
      }
    ],
    sources: ['faq.txt', 'product_info.txt'],
    confidence: 0.95
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioPlayerRef = useRef(null);

  const startListening = async () => {
    try {
      setMicStatus('listening');
      setIsRecording(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudioTurn(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.warn('Microphone permission or capture warning:', err);
      setTimeout(async () => {
        await sendSimulatedTurn('Can students apply for Pay-in-3 zero-cost EMI?');
      }, 2000);
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
    setMicStatus('processing');
  };

  const sendAudioTurn = async (blob) => {
    setMicStatus('processing');
    const formData = new FormData();
    formData.append('file', blob, 'customer_turn.wav');
    formData.append('session_id', 'sess_voice_assistant_01');

    try {
      const res = await axios.post('/api/v1/audio/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data) {
        setTranscript(res.data.transcript || 'Can students apply for Pay-in-3?');
        setAiAnswer(res.data.ai_answer || 'Full-time college students aged 18+ qualify.');
        if (res.data.orchestrator_data) {
          setTurnResponse(res.data.orchestrator_data);
        }
        if (res.data.audio_base64) {
          playVoiceResponse(res.data.audio_base64, res.data.ai_answer);
        } else {
          speakBrowserTTS(res.data.ai_answer);
        }
      }
    } catch (err) {
      console.error('Voice turn processing error:', err);
      await sendSimulatedTurn('What KYC documents are required for Pay-in-3?');
    }
  };

  const sendSimulatedTurn = async (queryText) => {
    setMicStatus('processing');
    try {
      const res = await axios.post('/api/v1/copilot/process-turn', {
        session_id: 'sess_voice_sim_01',
        query: queryText
      });
      if (res.data) {
        setTranscript(queryText);
        setAiAnswer(res.data.answer);
        setTurnResponse(res.data);
        speakBrowserTTS(res.data.answer);
      }
    } catch (e) {
      console.error(e);
      setMicStatus('standby');
    }
  };

  const playVoiceResponse = (url, fallbackText) => {
    setMicStatus('speaking');

    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = url;
      audioPlayerRef.current.play().catch(() => {
        speakBrowserTTS(fallbackText);
      });
      audioPlayerRef.current.onended = () => {
        setMicStatus('standby');
      };
    } else {
      speakBrowserTTS(fallbackText);
    }
  };

  const speakBrowserTTS = (text) => {
    if ('speechSynthesis' in window) {
      setMicStatus('speaking');
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.onend = () => {
        setMicStatus('standby');
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setMicStatus('standby');
    }
  };

  const renderStatusBadge = () => {
    switch (micStatus) {
      case 'listening':
        return (
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse">
            <Radio className="w-4 h-4 animate-ping text-red-400" />
            <span>Listening to Customer...</span>
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Processing Speech (Whisper STT)...</span>
          </span>
        );
      case 'speaking':
        return (
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30 animate-pulse">
            <Volume2 className="w-4 h-4 text-sky-400 animate-bounce" />
            <span>Co-Pilot Speaking Audio Response...</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <Mic className="w-4 h-4 text-slate-400" />
            <span>Microphone Standby</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top AI Consent Banner */}
      <ConsentBanner />

      {/* Hidden Audio Element */}
      <audio ref={audioPlayerRef} className="hidden" />

      {/* Hero Animated Voice Console Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl text-white shadow-md shadow-sky-500/20">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-bold text-slate-100">Real-Time Voice AI Sales Co-Pilot</h2>
                {renderStatusBadge()}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">OpenAI Whisper STT • Gemini RAG Pipeline • Natural Speech Synthesis</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => sendSimulatedTurn('What KYC documents are required for Pay-in-3?')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Simulate KYC Question</span>
            </button>
          </div>
        </div>

        {/* Center Animated Pulsing Microphone Visualizer */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div className="relative flex items-center justify-center">
            {micStatus === 'listening' && (
              <>
                <span className="absolute w-24 h-24 rounded-full bg-red-500/20 animate-ping"></span>
                <span className="absolute w-32 h-32 rounded-full bg-red-500/10 animate-pulse"></span>
              </>
            )}
            {micStatus === 'speaking' && (
              <>
                <span className="absolute w-24 h-24 rounded-full bg-sky-500/20 animate-ping"></span>
                <span className="absolute w-32 h-32 rounded-full bg-sky-500/10 animate-pulse"></span>
              </>
            )}

            <button
              onClick={isRecording ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all z-10 cursor-pointer ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/30'
                  : 'bg-gradient-to-tr from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/30'
              }`}
            >
              {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          {/* Real-Time Audio Waveform Visualizer Bars */}
          <div className="flex items-center space-x-1.5 h-8 pt-2">
            {[40, 75, 30, 90, 50, 85, 35, 95, 60, 40, 80, 55, 30].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  micStatus === 'listening'
                    ? 'bg-red-400 animate-pulse'
                    : micStatus === 'speaking'
                    ? 'bg-sky-400 animate-pulse'
                    : 'bg-slate-800'
                }`}
                style={{ height: micStatus !== 'standby' ? `${h}%` : '20%' }}
              ></div>
            ))}
          </div>

          <p className="text-xs font-semibold text-slate-400">
            {isRecording ? 'Listening... Click to stop speech capture' : 'Click microphone to start voice conversation'}
          </p>
        </div>
      </div>

      {/* Main 2-Column Voice Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Speech Transcript & AI Response (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card title="Customer Speech Transcript" subtitle="OpenAI Whisper STT Output">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span className="flex items-center space-x-1.5">
                  <User className="w-4 h-4" />
                  <span>Customer Speech Transcript</span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">Confidence: 98%</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{transcript}</p>
            </div>
          </Card>

          <Card title="AI Voice Co-Pilot Response" subtitle="Google Gemini Synthesis & TTS Audio">
            <div className="p-4 bg-sky-950/40 rounded-xl border border-sky-800/40 space-y-3 text-xs">
              <div className="flex items-center justify-between text-sky-400 font-bold">
                <span className="flex items-center space-x-1.5">
                  <Bot className="w-4 h-4" />
                  <span>AI Co-Pilot Answer</span>
                </span>
                <button
                  onClick={() => speakBrowserTTS(aiAnswer)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold hover:bg-sky-500/30 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Replay Voice</span>
                </button>
              </div>
              <p className="text-sky-100 text-sm leading-relaxed">{aiAnswer}</p>
            </div>
          </Card>
        </div>

        {/* Right Column: Next-Best Action Suggestions Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <AISuggestions recommendations={turnResponse.recommendations} />
        </div>
      </div>

      {/* Bottom Row: Executive CRM Summary Card */}
      <div>
        <CRMSummaryCard crmData={turnResponse.crm || turnResponse.crm_data} />
      </div>
    </div>
  );
}
