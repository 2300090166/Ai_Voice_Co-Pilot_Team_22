import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { PhoneCall, ShieldCheck, Zap, Bot, Database, BarChart3, ArrowRight } from 'lucide-react';

/**
 * Home Overview Page
 * Executive landing view introducing the AI Voice Co-Pilot for Inside Sales.
 */
export default function Home() {
  const agentList = [
    { name: 'Intent Agent', desc: 'Classifies customer intent & financial query category in real-time.' },
    { name: 'Emotion Agent', desc: 'Analyzes customer sentiment, hesitation cues, and pitch responsiveness.' },
    { name: 'Knowledge (RAG) Agent', desc: 'Queries FAISS vector index for Pay-in-3 eligibility, FAQs, & fees.' },
    { name: 'Recommendation Agent', desc: 'Generates real-time Next-Best Actions (NBAs) and objection scripts.' },
    { name: 'Compliance Agent', desc: 'Enforces mandatory zero-cost interest & fee disclosures during calls.' },
    { name: 'CRM Agent', desc: 'Auto-logs call summaries, interest ratings, and follow-up tasks.' },
    { name: 'Self Evaluation Agent', desc: 'Scores call quality, script adherence, and provides agent feedback.' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 border border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-semibold tracking-wide">
            Fintech Pay-in-3 Zero-Cost EMI
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            AI Voice Co-Pilot for Inside Sales Reps
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time, sub-second co-pilot assisting inside sales agents during customer conversations.
            Powered by Google Gemini 2.5 Flash, OpenAI Whisper, FAISS RAG, and an 7-agent multi-agent architecture.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/call-assistant"
              className="inline-flex items-center space-x-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-sky-500/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Launch Live Call Co-Pilot</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>View Executive Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Real-Time Co-Pilot" subtitle="Whisper STT + Antigravity Orchestrator">
          <div className="flex items-start space-x-3 text-sm text-slate-300">
            <Zap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <p>Processes live audio streams, surfacing Next Best Actions and objection handlers instantaneously.</p>
          </div>
        </Card>

        <Card title="Pay-in-3 RAG Retriever" subtitle="FAISS Vector Index">
          <div className="flex items-start space-x-3 text-sm text-slate-300">
            <Database className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <p>Instantly answers questions regarding credit limits, zero-interest terms, and repayment timelines.</p>
          </div>
        </Card>

        <Card title="Compliance Auditor" subtitle="Automated Policy Guardrails">
          <div className="flex items-start space-x-3 text-sm text-slate-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p>Audits required disclosures in real-time, preventing regulatory non-compliance risks during sales calls.</p>
          </div>
        </Card>
      </div>

      {/* 7-Agent Architecture Matrix */}
      <Card title="Multi-Agent AI Ecosystem" subtitle="7 Specialized Autonomous Agents">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {agentList.map((agent, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-sky-400" />
                <span className="font-semibold text-sm text-slate-200">{agent.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{agent.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
