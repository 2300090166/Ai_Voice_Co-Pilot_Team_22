import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowUpRight, Lightbulb } from 'lucide-react';

/**
 * AI Suggestions Panel Component
 * Displays real-time Next-Best Action (NBA) recommendation cards for sales agents.
 */
export default function AISuggestions({ recommendations = [] }) {
  const defaultSuggestions = [
    {
      title: 'Explain Zero Interest EMI',
      priority: 'High',
      reason: 'Customer requested Pay-in-3 installment terms and interest conditions.'
    },
    {
      title: 'Offer Application Link',
      priority: 'Medium',
      reason: 'Customer is eligible; offer instant digital checkout link.'
    }
  ];

  const items = recommendations.length > 0 ? recommendations : defaultSuggestions;

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">AI Suggestions</h3>
            <p className="text-xs text-slate-400">Real-time Next-Best Actions</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
          {items.length} Actions Available
        </span>
      </div>

      {/* Recommendation Cards List */}
      <div className="space-y-3">
        {items.map((rec, index) => (
          <div
            key={index}
            className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-xl hover:border-sky-500/40 transition-all space-y-2 group"
          >
            {/* Title & Priority Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-sm text-slate-100 group-hover:text-sky-300 transition-colors">
                  {rec.title}
                </span>
              </div>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getPriorityStyle(rec.priority)}`}>
                {rec.priority} Priority
              </span>
            </div>

            {/* Reason Explanation */}
            <div className="pl-6 pt-1 border-t border-slate-800/50 flex items-start space-x-2 text-xs">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-400">Reason: </span>
                <span className="text-slate-300">{rec.reason}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
