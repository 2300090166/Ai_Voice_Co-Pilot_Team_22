import React from 'react';
import { User, Phone, CreditCard, Clock, Activity, Tag, ShieldAlert } from 'lucide-react';

/**
 * Customer Information Left Panel Component
 * Displays active customer lead profile, contact info, interest tag, and connection status.
 */
export default function CustomerInfo() {
  const customer = {
    name: 'Alexander Wright',
    id: 'CUST-8921',
    phone: '+1 (555) 019-2834',
    product: 'Pay-in-3 Zero-Cost EMI',
    limit: '$1,500 Qualified',
    status: 'Active Call • Connected',
    duration: '03m 42s'
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
            <User className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Customer Profile</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live Call
        </span>
      </div>

      {/* Customer Avatar & Primary Details */}
      <div className="flex items-center space-x-3.5 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
          AW
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-100">{customer.name}</h4>
          <span className="text-[10px] font-mono text-slate-400">{customer.id}</span>
        </div>
      </div>

      {/* Detail Fields List */}
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
          <span className="text-slate-400 flex items-center space-x-2">
            <Phone className="w-3.5 h-3.5 text-sky-400" />
            <span>Phone</span>
          </span>
          <span className="font-semibold font-mono text-slate-200">{customer.phone}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
          <span className="text-slate-400 flex items-center space-x-2">
            <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Product Interest</span>
          </span>
          <span className="font-semibold text-sky-400">{customer.product}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
          <span className="text-slate-400 flex items-center space-x-2">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Credit Limit</span>
          </span>
          <span className="font-semibold text-emerald-400">{customer.limit}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/60">
          <span className="text-slate-400 flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Duration</span>
          </span>
          <span className="font-mono font-semibold text-slate-200">{customer.duration}</span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-400 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Status</span>
          </span>
          <span className="font-semibold text-emerald-400 text-[11px]">{customer.status}</span>
        </div>
      </div>
    </div>
  );
}
