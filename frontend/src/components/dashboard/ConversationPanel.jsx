import React, { useState } from 'react';
import { Send, Bot, User, MessageSquare, Loader2, PhoneOff } from 'lucide-react';
import axios from 'axios';

/**
 * Live Conversation Center Panel Component
 * Displays scrollable chat interface. Resets messages and disables form when session is ended.
 */
export default function ConversationPanel({ messages = [], sessionStatus = 'streaming', onTurnProcessed, onMessagesUpdate }) {
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendTurn = async (e) => {
    e.preventDefault();
    if (!inputQuery.trim() || sessionStatus === 'ended') return;

    const userQuery = inputQuery;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setInputQuery('');
    const userMsg = { id: Date.now(), speaker: 'Customer', text: userQuery, time: nowTime };

    if (onMessagesUpdate) {
      onMessagesUpdate((prev) => [...prev, userMsg]);
    }
    setLoading(true);

    try {
      const res = await axios.post('/api/v1/copilot/process-turn', {
        session_id: 'sess_live_dashboard_01',
        query: userQuery
      });

      if (res.data) {
        if (res.data.answer && onMessagesUpdate) {
          onMessagesUpdate((prev) => [
            ...prev,
            { id: Date.now() + 1, speaker: 'AI Co-Pilot', text: res.data.answer, time: nowTime }
          ]);
        }
        if (onTurnProcessed) {
          onTurnProcessed(res.data);
        }
      }
    } catch (err) {
      console.error('[ConversationPanel] API turn processing error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col h-[560px]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-500/20">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Live Conversation Feed</h3>
            <p className="text-[11px] text-slate-400">Real-time Whisper STT & Turn Processor</p>
          </div>
        </div>
        <span className={`flex items-center space-x-1.5 text-[10px] font-mono border px-2 py-0.5 rounded-full ${
          sessionStatus === 'ended'
            ? 'bg-slate-800 text-slate-400 border-slate-700'
            : sessionStatus === 'paused'
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          {sessionStatus === 'streaming' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>}
          <span className="capitalize">{sessionStatus === 'streaming' ? 'Streaming' : sessionStatus}</span>
        </span>
      </div>

      {/* Scrollable Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500 space-y-2 border border-dashed border-slate-800 rounded-xl my-auto">
            <PhoneOff className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-400">Call session has ended.</p>
            <p className="text-[11px] text-slate-500">Click "Start Co-Pilot Stream" to begin a new customer conversation.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-xl border leading-relaxed space-y-1 ${
                m.speaker === 'Customer'
                  ? 'bg-slate-950/80 border-slate-800 text-slate-200'
                  : 'bg-sky-950/30 border-sky-800/40 text-sky-100 ml-4 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-bold flex items-center space-x-1.5 ${m.speaker === 'Customer' ? 'text-indigo-400' : 'text-sky-400'}`}>
                  {m.speaker === 'Customer' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  <span>{m.speaker}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">{m.time}</span>
              </div>
              <p className="text-slate-300 pt-0.5">{m.text}</p>
            </div>
          ))
        )}

        {loading && (
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-sky-400 flex items-center space-x-2 animate-pulse ml-4">
            <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
            <span>AI Orchestrator processing Knowledge RAG & Gemini synthesis...</span>
          </div>
        )}
      </div>

      {/* Turn Processor Input Form */}
      <form onSubmit={handleSendTurn} className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputQuery}
            disabled={sessionStatus === 'ended' || loading}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={sessionStatus === 'ended' ? 'Session ended. Start stream to type query...' : "Simulate customer query (e.g. 'What KYC documents are required?')..."}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || sessionStatus === 'ended' || !inputQuery.trim()}
          className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-sky-500/20 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Process Turn</span>
        </button>
      </form>
    </div>
  );
}
