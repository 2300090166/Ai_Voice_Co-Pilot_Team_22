import React from 'react';
import { Database, Award, Activity, Calendar, ArrowRight, ShoppingBag, FileText, CheckCircle2, Clock } from 'lucide-react';

/**
 * CRM Summary Card Component
 * Executive CRM record display featuring Interest Score Progress Bar,
 * Conversation Status badge, Follow-up timeline, and products discussed.
 */
export default function CRMSummaryCard({ crmData }) {
  const summary = crmData?.customer_summary ||
    'Customer inquired about Pay-in-3 zero-cost EMI eligibility for a laptop purchase and verified student debit card requirements.';
  const score = crmData?.interest_score ?? 87;
  const status = crmData?.conversation_status || 'Interested';
  const products = crmData?.products_discussed || ['Pay-in-3 Zero-Cost EMI'];
  const nextAction = crmData?.next_best_action || 'Offer Application Link';
  const followUp = crmData?.follow_up || 'Call Tomorrow';

  const getStatusBadge = (st) => {
    switch (st?.toLowerCase()) {
      case 'interested':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'needs follow-up':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'escalation required':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'not interested':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  const getScoreColor = (sc) => {
    if (sc >= 75) return 'from-emerald-500 to-teal-400';
    if (sc >= 50) return 'from-amber-500 to-yellow-400';
    return 'from-red-500 to-rose-400';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">CRM Auto-Summary</h3>
            <p className="text-[11px] text-slate-400">CRM Agent Automation Engine</p>
          </div>
        </div>
        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getStatusBadge(status)}`}>
          {status}
        </span>
      </div>

      {/* Metrics Row: Interest Score Progress Bar & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Interest Score Progress Bar */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-semibold uppercase flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Interest Score</span>
            </span>
            <span className="font-mono font-extrabold text-emerald-400 text-xs">{score}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div
              className={`bg-gradient-to-r ${getScoreColor(score)} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>

        {/* Follow-up Timeline */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
          <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-sky-400" />
            <span>Follow-up Timeline</span>
          </span>
          <p className="text-xs font-bold text-sky-400 pt-0.5 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-sky-400" />
            <span>{followUp}</span>
          </p>
        </div>

        {/* Next Best Action */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
          <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>Next Best Action</span>
          </span>
          <p className="text-xs font-bold text-emerald-400 pt-0.5 truncate">{nextAction}</p>
        </div>
      </div>

      {/* Customer Summary Paragraph */}
      <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1 text-xs">
        <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-semibold uppercase">Executive Customer Summary</span>
        </div>
        <p className="text-slate-300 leading-relaxed font-sans">{summary}</p>
      </div>

      {/* Products Discussed Tags */}
      <div className="flex items-center space-x-2 text-xs pt-1 border-t border-slate-800/60">
        <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
        <span className="font-semibold text-slate-400">Products Discussed:</span>
        <div className="flex flex-wrap gap-1">
          {products.map((p, idx) => (
            <span key={idx} className="font-mono text-[10px] bg-slate-800 text-sky-300 border border-slate-700 px-2 py-0.5 rounded">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
