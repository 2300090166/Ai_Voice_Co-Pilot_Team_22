import React from 'react';
import { Target, Smile, Gauge, FileText, CheckCircle2 } from 'lucide-react';

/**
 * AI Insights Right Panel Component
 * Displays real-time Intent classification, Detected Emotion, Confidence score,
 * and retrieved FAISS knowledge sources.
 */
export default function InsightsPanel({ turnData }) {
  const intent = turnData?.intent || 'EMI_INFORMATION';
  const emotion = turnData?.emotion_data?.emotion || 'Interested';
  const confidence = turnData?.confidence ? `${(turnData.confidence * 100).toFixed(0)}%` : '95%';
  const sources = turnData?.sources || ['faq.txt', 'product_info.txt'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">AI Intelligence Insights</h3>
        </div>
        <span className="text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
          Multi-Agent Active
        </span>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {/* Current Intent */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Target className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-semibold uppercase">Current Intent</span>
          </div>
          <p className="font-extrabold text-sky-400 text-xs truncate">{intent}</p>
        </div>

        {/* Detected Emotion */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Smile className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-semibold uppercase">Customer Tone</span>
          </div>
          <p className="font-extrabold text-emerald-400 text-xs">{emotion}</p>
        </div>

        {/* Confidence Score */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1 col-span-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-semibold uppercase flex items-center space-x-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              <span>Conversation Confidence</span>
            </span>
            <span className="font-mono font-extrabold text-amber-400 text-xs">{confidence}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: confidence }}
            ></div>
          </div>
        </div>
      </div>

      {/* Retrieved Documents & Sources */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Retrieved RAG Sources</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500">{sources.length} Documents</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {sources.map((src, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-1 font-mono text-[10px] bg-slate-950 text-indigo-300 border border-slate-800 px-2 py-1 rounded-md"
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{src}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
