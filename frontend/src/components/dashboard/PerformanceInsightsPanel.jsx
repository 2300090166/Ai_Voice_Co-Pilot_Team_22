import React from 'react';
import { Award, CheckCircle2, AlertTriangle, Lightbulb, TrendingUp, ShieldCheck, Zap, Sparkles } from 'lucide-react';

/**
 * AI Performance Insights Panel Component
 * Post-conversation AI Sales Coaching Engine output.
 * Renders Overall Sales Score (0-100), Conversation Quality, Customer Interest,
 * Conversion Probability, Strengths, Improvement Areas, and AI Coaching Suggestions.
 */
export default function PerformanceInsightsPanel({ insightsData }) {
  const score = insightsData?.sales_score ?? 91;
  const interestLevel = insightsData?.interest_level || 'High';
  const quality = insightsData?.conversation_quality || 'Excellent';
  const conversionProb = insightsData?.conversion_probability ?? 87;

  const defaultStrengths = [
    'Explained Pay-in-3 zero-cost EMI benefits clearly',
    'Grounded answers strictly in verified company knowledge base',
    'Maintained compliant and professional sales tone'
  ];
  const defaultImprovements = [
    'Mention promotional cashback offers earlier in the call'
  ];
  const defaultSuggestions = [
    'Offer application link',
    'Send product brochure'
  ];

  const strengths = insightsData?.strengths?.length ? insightsData.strengths : defaultStrengths;
  const improvements = insightsData?.improvements?.length ? insightsData.improvements : defaultImprovements;
  const suggestions = insightsData?.suggestions?.length ? insightsData.suggestions : defaultSuggestions;

  const getQualityBadge = (q) => {
    switch (q?.toLowerCase()) {
      case 'excellent':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'good':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'average':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-red-500/10 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">AI Performance Insights</h3>
            <p className="text-[11px] text-slate-400">Post-Call Sales Coach & Evaluation Engine</p>
          </div>
        </div>
        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getQualityBadge(quality)}`}>
          {quality} Quality
        </span>
      </div>

      {/* Top 4 Score Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Sales Score */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full border-2 border-amber-400/80 bg-amber-500/10 flex items-center justify-center font-mono font-extrabold text-sm text-amber-400">
            {score}
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase block">Sales Score</span>
            <span className="font-extrabold text-slate-100">{score}/100</span>
          </div>
        </div>

        {/* Customer Interest */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center space-x-1">
            <Zap className="w-3 h-3 text-sky-400" />
            <span>Interest Level</span>
          </span>
          <p className="font-extrabold text-sky-400 text-sm">{interestLevel}</p>
        </div>

        {/* Conversation Quality */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Call Quality</span>
          </span>
          <p className="font-extrabold text-emerald-400 text-sm">{quality}</p>
        </div>

        {/* Conversion Probability */}
        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-0.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-indigo-400" />
            <span>Conversion Rate</span>
          </span>
          <p className="font-extrabold text-indigo-400 text-sm">{conversionProb}%</p>
        </div>
      </div>

      {/* Strengths & Improvement Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Strengths Card */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Strengths Identified</span>
          </div>
          <ul className="space-y-2">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvement Areas Card */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2.5">
          <div className="flex items-center space-x-1.5 text-amber-400 font-bold border-b border-slate-800 pb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Improvement Areas</span>
          </div>
          <ul className="space-y-2">
            {improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Coaching Suggestions Footer */}
      <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
        <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
          <Lightbulb className="w-4 h-4 text-sky-400" />
          <span>AI Sales Coach Suggestions</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-0.5">
          {suggestions.map((sug, i) => (
            <span key={i} className="inline-flex items-center space-x-1 font-semibold text-[11px] bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>{sug}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
