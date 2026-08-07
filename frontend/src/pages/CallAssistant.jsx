import React, { useState } from 'react';
import Card from '../components/Card';
import { Mic, MicOff, PhoneOff, ShieldCheck, Sparkles, AlertCircle, FileText, CheckCircle2, MessageSquare } from 'lucide-react';

/**
 * Live Call Assistant Page Layout
 * Real-time voice co-pilot interface featuring live transcript stream, Next-Best Action cards,
 * Pay-in-3 RAG policy lookup, and mandatory compliance disclosure tracking.
 */
export default function CallAssistant() {
  const [isLive, setIsLive] = useState(false);

  // Starter sample transcript stream placeholder for UI layout demonstration
  const sampleTranscripts = [
    { speaker: 'Customer', text: 'Hi, I am interested in buying this laptop, but I want to know if Pay-in-3 really has zero interest?' },
    { speaker: 'Agent', text: 'Hello! Yes, absolutely. Pay-in-3 allows you to split your purchase into 3 equal payments with 0% interest.' },
    { speaker: 'Customer', text: 'Is there any processing fee or hidden charge if I pay on time?' },
  ];

  const nextBestActions = [
    { title: 'Explain Zero Subvention Fee', desc: 'Emphasize that the merchant covers the zero-interest cost for orders under $500.', confidence: '98%' },
    { title: 'Highlight 3-Day Grace Period', desc: 'Mention the 3-day buffer before any late fee occurs to reassure hesitation.', confidence: '94%' },
  ];

  const complianceChecklist = [
    { rule: 'Mandatory 0% Interest Disclosure', status: 'Passed', severity: 'HIGH' },
    { rule: 'Grace Period & Late Fee Disclosure', status: 'Pending', severity: 'MEDIUM' },
    { rule: 'Soft Credit Check Clarification', status: 'Pending', severity: 'HIGH' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Session Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-full ${isLive ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-100">Live Customer Call • Session #SESS-2026-0891</h2>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isLive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-800 text-slate-400'}`}>
                {isLive ? 'Streaming Live' : 'Standby'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Lead: Alexander Wright (Pay-in-3 Interest Query)</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all ${
              isLive
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
            }`}
          >
            {isLive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isLive ? 'Pause Stream' : 'Start Co-Pilot Stream'}</span>
          </button>
          <button
            disabled={!isLive}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call Session</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Co-Pilot Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-time Transcript Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card title="Real-Time Call Transcript" subtitle="Whisper STT Stream" className="h-[520px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {sampleTranscripts.map((t, index) => (
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
              ))}
            </div>
          </Card>
        </div>

        {/* Middle Column: Next-Best Actions & RAG Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card
            title="Next Best Actions"
            subtitle="Recommendation Agent Suggestions"
            headerAction={<Sparkles className="w-4 h-4 text-sky-400" />}
          >
            <div className="space-y-3">
              {nextBestActions.map((nba, i) => (
                <div key={i} className="p-3 bg-sky-950/20 border border-sky-800/40 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-sky-300">{nba.title}</span>
                    <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">
                      {nba.confidence} match
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{nba.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Pay-in-3 RAG Context" subtitle="FAISS Policy Index">
            <div className="text-xs text-slate-300 space-y-2">
              <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                <span className="font-semibold text-indigo-400 block mb-1">Zero-Cost EMI Policy</span>
                <p className="text-slate-400">Order amount split 33.33% upfront, 33.33% at 30 days, 33.34% at 60 days. No interest or hidden fees.</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Real-time Compliance Auditor & CRM Summary (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <Card title="Compliance Auditor" subtitle="Compliance Agent Monitor">
            <div className="space-y-2.5">
              {complianceChecklist.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg text-xs">
                  <span className="text-slate-300 pr-2">{c.rule}</span>
                  {c.status === 'Passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card title="CRM Auto-Disposition" subtitle="CRM Agent Integration">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>Lead Stage:</span>
                <span className="font-semibold text-slate-200">Interested</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-slate-400">
                <span>Product Tag:</span>
                <span className="font-semibold text-sky-400">Pay-in-3 EMI</span>
              </div>
              <div className="flex justify-between py-1 text-slate-400">
                <span>Follow-up:</span>
                <span className="font-semibold text-slate-200">Auto Email</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
