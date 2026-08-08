import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import CostMetricCard from '../components/dashboard/CostMetricCard';
import { BarChart3, TrendingUp, Users, PhoneCall, CheckCircle2, Award, Zap, Clock, ShieldCheck, Database, Search, ArrowUpRight, Cpu, Layers, DollarSign } from 'lucide-react';
import axios from 'axios';

/**
 * Enterprise Analytics Dashboard Page Component
 * Executive view for Sales Managers featuring KPI cards, Cost Per Interaction card,
 * Intent distribution bars, Customer Interest metrics, Call Quality breakdown,
 * Conversion Probability, AI Usage & RAG performance metrics, and Recent Conversations table.
 */
export default function Analytics() {
  const [data, setData] = useState({
    kpi_cards: {
      total_conversations: 142,
      active_conversations: 12,
      completed_conversations: 130,
      average_sales_score: 84.5,
      average_customer_interest: '82% High Interest',
      average_ai_confidence: '94.2%',
      average_response_time: '1.2s'
    },
    intent_distribution: [
      { name: 'EMI Information', category: 'EMI', percentage: 45, count: 64 },
      { name: 'KYC & Verification', category: 'KYC', percentage: 25, count: 35 },
      { name: 'Eligibility Check', category: 'Eligibility', percentage: 15, count: 21 },
      { name: 'Offers & Promos', category: 'Offers', percentage: 10, count: 14 },
      { name: 'Complaints & Support', category: 'Complaint', percentage: 3, count: 5 },
      { name: 'General Inquiries', category: 'General', percentage: 2, count: 3 }
    ],
    customer_interest_distribution: [
      { level: 'High Interest', percentage: 65, color: 'bg-emerald-500' },
      { level: 'Medium Interest', percentage: 25, color: 'bg-sky-500' },
      { level: 'Low Interest', percentage: 10, color: 'bg-amber-500' }
    ],
    quality_distribution: [
      { quality: 'Excellent', percentage: 55, count: 78 },
      { quality: 'Good', percentage: 30, count: 42 },
      { quality: 'Average', percentage: 10, count: 14 },
      { quality: 'Needs Improvement', percentage: 5, count: 8 }
    ],
    conversion_metrics: {
      average_conversion_rate: 78,
      highest_conversion: 94,
      lowest_conversion: 45
    },
    ai_usage_metrics: {
      documents_retrieved: 426,
      average_retrieval_time_ms: 120,
      gemini_response_time_ms: 850,
      average_recommendations_generated: 3.4
    },
    recent_conversations: [
      { id: 'SESS-2026-0891', customer: 'Alexander Wright', intent: 'EMI Information', interest: 'High', sales_score: 91, status: 'Interested', time: '10:42 AM' },
      { id: 'SESS-2026-0890', customer: 'Sophia Chen', intent: 'KYC Verification', interest: 'High', sales_score: 88, status: 'Needs Follow-up', time: '10:35 AM' },
      { id: 'SESS-2026-0889', customer: 'Marcus Miller', intent: 'Eligibility Check', interest: 'Medium', sales_score: 79, status: 'Interested', time: '10:18 AM' },
      { id: 'SESS-2026-0888', customer: 'Emily Davis', intent: 'Offers & Cashback', interest: 'High', sales_score: 95, status: 'Interested', time: '09:50 AM' },
      { id: 'SESS-2026-0887', customer: 'David Wilson', intent: 'Complaint', interest: 'Low', sales_score: 58, status: 'Escalation Required', time: '09:22 AM' }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/analytics/dashboard');
      if (res.data && res.data.kpi_cards) {
        setData(res.data);
      }
    } catch (err) {
      console.warn('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = data.recent_conversations.filter(
    (c) =>
      c.customer.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.intent.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getStatusBadge = (st) => {
    switch (st?.toLowerCase()) {
      case 'interested':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'needs follow-up':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'escalation required':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-xl text-white shadow-md shadow-sky-500/20">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Enterprise Analytics Dashboard</h1>
            <p className="text-xs text-slate-400">Executive Insights • AI Voice Co-Pilot Sales Operations</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Real-Time Live Aggregation</span>
          </span>
          <button
            onClick={fetchAnalytics}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
          >
            Refresh Metrics
          </button>
        </div>
      </div>

      {/* Cost Per Interaction Banner & KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <CostMetricCard />
        </div>
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 text-sky-400" />
              <span>Total Calls</span>
            </span>
            <p className="font-extrabold text-lg text-slate-100">{data.kpi_cards.total_conversations}</p>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Active Calls</span>
            </span>
            <p className="font-extrabold text-lg text-emerald-400">{data.kpi_cards.active_conversations}</p>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-indigo-400" />
              <span>Completed</span>
            </span>
            <p className="font-extrabold text-lg text-indigo-400">{data.kpi_cards.completed_conversations}</p>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Avg Sales Score</span>
            </span>
            <p className="font-extrabold text-lg text-amber-400">{data.kpi_cards.average_sales_score}/100</p>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Avg Interest</span>
            </span>
            <p className="font-extrabold text-xs text-emerald-400 pt-1">{data.kpi_cards.average_customer_interest}</p>
          </div>

          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] font-semibold uppercase text-slate-400 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>AI Confidence</span>
            </span>
            <p className="font-extrabold text-lg text-sky-400">{data.kpi_cards.average_ai_confidence}</p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Charts & Performance Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Intent Distribution Breakdown Bars (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card title="Customer Intent Distribution" subtitle="Turn Intent Classification Breakdown (%)">
            <div className="space-y-3 pt-1 text-xs">
              {data.intent_distribution.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-semibold">{item.name}</span>
                    <span className="font-mono text-slate-400">{item.percentage}% ({item.count} turns)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Customer Interest, Call Quality & Conversion Probability (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Interest Breakdown */}
            <Card title="Customer Interest Level" subtitle="High, Medium, Low Breakdown">
              <div className="space-y-3 pt-1 text-xs">
                {data.customer_interest_distribution.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold">{item.level}</span>
                      <span className="font-mono text-slate-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conversation Quality Breakdown */}
            <Card title="Call Quality Distribution" subtitle="Excellent, Good, Average Breakdown">
              <div className="space-y-3 pt-1 text-xs">
                {data.quality_distribution.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-semibold">{item.quality}</span>
                      <span className="font-mono text-slate-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Conversion Probability & AI Usage Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Conversion Rates */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold border-b border-slate-800 pb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Conversion Probability</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Avg Rate</span>
                  <span className="font-mono font-extrabold text-emerald-400 text-sm">{data.conversion_metrics.average_conversion_rate}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Highest</span>
                  <span className="font-mono font-extrabold text-sky-400 text-sm">{data.conversion_metrics.highest_conversion}%</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Lowest</span>
                  <span className="font-mono font-extrabold text-amber-400 text-sm">{data.conversion_metrics.lowest_conversion}%</span>
                </div>
              </div>
            </div>

            {/* AI System Usage Metrics */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-1.5 text-sky-400 font-bold border-b border-slate-800 pb-2">
                <Cpu className="w-4 h-4" />
                <span>AI System Usage Metrics</span>
              </div>
              <div className="space-y-1 text-[11px] pt-0.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">FAISS Docs Retrieved:</span>
                  <span className="font-mono font-bold text-slate-200">{data.ai_usage_metrics.documents_retrieved} docs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RAG Search Latency:</span>
                  <span className="font-mono font-bold text-sky-400">{data.ai_usage_metrics.average_retrieval_time_ms}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gemini Response Latency:</span>
                  <span className="font-mono font-bold text-indigo-400">{data.ai_usage_metrics.gemini_response_time_ms}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Recommendations:</span>
                  <span className="font-mono font-bold text-emerald-400">{data.ai_usage_metrics.average_recommendations_generated} / turn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Conversations Data Table */}
      <Card title="Recent AI-Assisted Customer Conversations" subtitle="Real-time session logs with status and sales scores">
        <div className="space-y-3">
          {/* Table Search Filter */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by customer, intent, or session ID..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Table Grid */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Session ID</th>
                  <th className="p-3">Customer Lead</th>
                  <th className="p-3">Intent Category</th>
                  <th className="p-3">Interest Level</th>
                  <th className="p-3">Sales Score</th>
                  <th className="p-3">Conversation Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                {filteredConversations.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-sky-400">{row.id}</td>
                    <td className="p-3 font-semibold text-slate-100">{row.customer}</td>
                    <td className="p-3 text-slate-300">{row.intent}</td>
                    <td className="p-3 font-semibold text-emerald-400">{row.interest}</td>
                    <td className="p-3">
                      <span className="font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {row.sales_score}/100
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500 text-[11px]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
