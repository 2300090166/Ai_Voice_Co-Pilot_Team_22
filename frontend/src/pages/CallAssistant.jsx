import React, { useState } from 'react';
import Card from '../components/Card';
import AISuggestions from '../components/AISuggestions';
import { Mic, MicOff, PhoneOff, ShieldCheck, Sparkles, CheckCircle2, Send, Bot, FileText, Play } from 'lucide-react';
import axios from 'axios';
import { useDemo } from '../context/DemoContext';

/**
 * Live Call Assistant Page Component
 * Manages explicit Call State Lifecycle:
 * Idle/Standby -> Start Stream -> Streaming Live -> Pause -> Paused -> Resume -> End Call Session -> Ended -> Back to Idle
 */
export default function CallAssistant() {
  const { demoMode } = useDemo();

  // Explicit session state machine: 'idle' | 'streaming' | 'paused' | 'ended'
  const [callState, setCallState] = useState('idle');
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const sampleTranscripts = [
    { speaker: 'Customer', text: 'Hi, I am interested in buying a laptop. Can students apply for Pay-in-3 zero-cost EMI?' },
    {
      speaker: 'AI Co-Pilot',
      text: 'Full-time college and university students aged 18 and older can apply for Pay-in-3 zero-cost EMI. Students qualify with a valid student ID, active bank debit card, and proof of part-time income or allowance.'
    }
  ];

  const sampleResponse = {
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
  };

  // State arrays initialized empty when idle/ended, or populated when active
  const [transcripts, setTranscripts] = useState(demoMode ? sampleTranscripts : []);
  const [currentResponse, setCurrentResponse] = useState(demoMode ? sampleResponse : {
    answer: '',
    intent: 'NONE',
    recommendations: [],
    sources: [],
    confidence: 0.0
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleStartSession = () => {
    setCallState('streaming');
    setTranscripts(sampleTranscripts);
    setCurrentResponse(sampleResponse);
    setInputQuery('');
    triggerToast('Co-Pilot Stream Started Successfully');
  };

  const handlePauseSession = () => {
    setCallState('paused');
    triggerToast('Co-Pilot Stream Paused');
  };

  const handleResumeSession = () => {
    setCallState('streaming');
    triggerToast('Co-Pilot Stream Resumed');
  };

  const handleEndSession = async () => {
    try {
      await axios.post('/api/v1/call/end', { session_id: 'sess_live_call_01' });
    } catch (err) {
      console.warn('Call end API notice:', err);
    }

    setCallState('ended');
    setTranscripts([]);
    setCurrentResponse({
      answer: '',
      intent: 'NONE',
      recommendations: [],
      sources: [],
      confidence: 0.0
    });
    setInputQuery('');
    triggerToast('Call Session Ended Successfully');
  };

  const handleSendTurn = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || callState === 'ended' || callState === 'idle') return;

    const userText = inputQuery;
    setInputQuery('');
    setTranscripts((prev) => [...prev, { speaker: 'Customer', text: userText }]);
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/copilot/process-turn', {
        session_id: 'sess_live_call_01',
        query: userText
      });

      if (res.data) {
        setCurrentResponse(res.data);
        if (res.data.answer) {
          setTranscripts((prev) => [...prev, { speaker: 'AI Co-Pilot', text: res.data.answer }]);
        }
      }
    } catch (err) {
      console.error('Co-Pilot turn error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = () => {
    switch (callState) {
      case 'streaming':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-500/10 text-red-400 border border-red-500/20 animate-pulse">
            Streaming Live
          </span>
        );
      case 'paused':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Paused
          </span>
        );
      case 'ended':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
            Ended
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
            Standby
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Call Session Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-full ${callState === 'streaming' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">Live Customer Call • Session #SESS-2026-0891</h2>
              {renderStatusBadge()}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Lead: Alexander Wright (Pay-in-3 Interest & Student Query)</p>
          </div>
        </div>

        {/* Dynamic Action Controls: Shows Start Stream when Idle/Ended; Pause & End Call when Streaming/Paused */}
        <div className="flex items-center space-x-3">
          {callState === 'idle' || callState === 'ended' ? (
            <button
              onClick={handleStartSession}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Start Co-Pilot Stream</span>
            </button>
          ) : (
            <>
              {callState === 'streaming' ? (
                <button
                  onClick={handlePauseSession}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <MicOff className="w-4 h-4" />
                  <span>Pause Stream</span>
                </button>
              ) : (
                <button
                  onClick={handleResumeSession}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Resume Stream</span>
                </button>
              )}

              <button
                onClick={handleEndSession}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all cursor-pointer"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call Session</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main 2-Column Co-Pilot Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Transcript Feed & Turn Simulator (6 cols) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col">
          <Card title="Live Call Transcript Feed" subtitle="Whisper STT Stream & Turn Processing" className="flex-1 flex flex-col min-h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[380px]">
              {transcripts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2 border border-dashed border-slate-800 rounded-xl my-auto">
                  <PhoneOff className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs font-semibold text-slate-400">No active conversation stream.</p>
                  <p className="text-[11px] text-slate-500">Click "Start Co-Pilot Stream" to begin a live customer call session.</p>
                </div>
              ) : (
                transcripts.map((t, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-xs leading-relaxed border ${
                      t.speaker === 'Customer'
                        ? 'bg-slate-900/90 border-slate-700/80 text-slate-200'
                        : 'bg-sky-950/40 border-sky-800/50 text-sky-200 ml-4'
                    }`}
                  >
                    <span className={`font-bold block mb-1 ${t.speaker === 'Customer' ? 'text-indigo-400' : 'text-sky-400'}`}>
                      {t.speaker}
                    </span>
                    <p>{t.text}</p>
                  </div>
                ))
              )}

              {loading && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-sky-400 flex items-center space-x-2 animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>AI Sales Co-Pilot analyzing context & generating suggestions...</span>
                </div>
              )}
            </div>

            {/* Simulated Live Turn Input Form */}
            <form onSubmit={handleSendTurn} className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputQuery}
                disabled={callState === 'ended' || callState === 'idle' || loading}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={callState === 'idle' || callState === 'ended' ? 'Session inactive. Click Start Co-Pilot Stream...' : "Simulate customer utterance (e.g., 'What KYC documents do I need?')..."}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || callState === 'ended' || callState === 'idle' || !inputQuery.trim()}
                className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Process Turn</span>
              </button>
            </form>
          </Card>
        </div>

        {/* Right Column: AI Suggestions Panel & Answer Card (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* AI Suggestions Panel Component */}
          <AISuggestions recommendations={currentResponse.recommendations} />

          {/* Gemini RAG Answer Card */}
          <Card title="AI Synthesized RAG Answer" subtitle={`Confidence Score: ${(currentResponse.confidence * 100).toFixed(0)}%`}>
            <div className="space-y-3 text-xs">
              {currentResponse.answer ? (
                <p className="text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {currentResponse.answer}
                </p>
              ) : (
                <div className="p-4 text-center text-slate-500 font-mono text-[11px]">
                  No active response payload. Click "Start Co-Pilot Stream" to process customer turns.
                </div>
              )}

              {currentResponse.sources?.length > 0 && (
                <div className="flex items-center space-x-2 text-slate-400 pt-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Knowledge Base Sources: </span>
                  <div className="flex items-center space-x-1">
                    {currentResponse.sources.map((src, i) => (
                      <span key={i} className="font-mono text-[10px] bg-slate-800 text-sky-300 px-2 py-0.5 rounded">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
