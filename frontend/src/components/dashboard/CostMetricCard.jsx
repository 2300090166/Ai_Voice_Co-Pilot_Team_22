import React from 'react';
import { DollarSign, Cpu, Info, Zap } from 'lucide-react';

/**
 * Cost Per Interaction Metric Card Component
 * Displays average inference cost per turn ($0.0003 / ₹0.02) and optimization details.
 */
export default function CostMetricCard() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <div className="p-1 bg-emerald-500/10 rounded text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Average AI Inference Cost</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          -85% Cost Savings
        </span>
      </div>

      <div className="flex items-baseline space-x-2 pt-0.5">
        <span className="font-mono font-extrabold text-lg text-emerald-400">$0.0003</span>
        <span className="text-xs text-slate-400 font-mono">per request (approx. ₹0.02)</span>
      </div>

      <div className="pt-2 border-t border-slate-800/60 flex items-start space-x-1.5 text-[11px] text-slate-400">
        <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
        <p className="leading-snug">
          Uses RAG vector retrieval and efficient Gemini 2.5 Flash model routing to minimize prompt token overhead and reduce inference cost.
        </p>
      </div>
    </div>
  );
}
