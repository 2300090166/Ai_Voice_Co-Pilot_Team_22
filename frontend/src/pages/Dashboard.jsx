import React from 'react';
import Card from '../components/Card';
import { PhoneCall, ShieldCheck, CheckCircle2, TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';

/**
 * Enterprise Dashboard Page
 * Sales performance metrics, call volume stats, compliance adherence, and lead disposition overview.
 */
export default function Dashboard() {
  const metrics = [
    { label: 'Total Calls Handled', value: '1,248', change: '+14% vs last week', icon: PhoneCall, color: 'text-sky-400' },
    { label: 'Pay-in-3 EMI Conversion', value: '38.4%', change: '+5.2% with Co-Pilot', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Compliance Adherence', value: '98.2%', change: 'Zero high disclosures missed', icon: ShieldCheck, color: 'text-indigo-400' },
    { label: 'Avg Call Duration', value: '4m 12s', change: '-45s shorter handle time', icon: Clock, color: 'text-amber-400' },
  ];

  const recentCalls = [
    { id: 'CALL-8921', customer: 'Sarah Jenkins', product: 'Pay-in-3 EMI ($1,200)', status: 'Approved & Converted', compliance: '100%', agentScore: '9.4/10' },
    { id: 'CALL-8922', customer: 'David Chen', product: 'Pay-in-3 EMI ($450)', status: 'Follow-up Scheduled', compliance: '95%', agentScore: '8.8/10' },
    { id: 'CALL-8923', customer: 'Marcus Vance', product: 'Pay-in-3 EMI ($2,800)', status: 'Under Review', compliance: '100%', agentScore: '9.1/10' },
    { id: 'CALL-8924', customer: 'Elena Rostova', product: 'Pay-in-3 EMI ($850)', status: 'Approved & Converted', compliance: '100%', agentScore: '9.6/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Inside Sales Performance Dashboard</h2>
        <p className="text-sm text-slate-400">Enterprise analytics for Pay-in-3 zero-cost EMI call sessions.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.label}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-extrabold text-slate-100">{m.value}</span>
                <p className="text-xs font-medium text-emerald-400 mt-1">{m.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Call Analytics Table */}
      <Card title="Recent Assisted Call Sessions" subtitle="Real-time multi-agent audit scorecard">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Call ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product Offer</th>
                <th className="py-3 px-4">Disposition</th>
                <th className="py-3 px-4">Compliance Audit</th>
                <th className="py-3 px-4">Self Eval Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentCalls.map((call) => (
                <tr key={call.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-sky-400 font-semibold">{call.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-200">{call.customer}</td>
                  <td className="py-3 px-4 text-xs text-slate-400">{call.product}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{call.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-slate-200">{call.compliance}</td>
                  <td className="py-3 px-4 text-xs font-bold text-sky-400">{call.agentScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
