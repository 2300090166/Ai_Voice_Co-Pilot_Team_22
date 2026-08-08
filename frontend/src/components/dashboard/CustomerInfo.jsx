import React, { useState } from 'react';
import { User, Phone, CreditCard, Clock, Activity, Tag, PhoneOff, CheckCircle2, Mic } from 'lucide-react';
import axios from 'axios';

/**
 * Customer Information Left Panel Component
 * Displays active customer lead profile, contact info, interest tag, connection status,
 * and End Call Session button.
 */
export default function CustomerInfo({ onSessionEnded }) {
  const [callEnded, setCallEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const customer = {
    name: 'Alexander Wright',
    id: 'CUST-8921',
    phone: '+1 (555) 019-2834',
    product: 'Pay-in-3 Zero-Cost EMI',
    limit: '$1,500 Qualified',
    duration: callEnded ? '00m 00s' : '03m 42s'
  };

  const handleEndCall = async () => {
    setLoading(true);
    try {
      await axios.post('/api/v1/call/end', { session_id: 'sess_live_dashboard_01' });
    } catch (err) {
      console.warn('End call API notice:', err);
    } finally {
      setCallEnded(true);
      setLoading(false);
      if (onSessionEnded) {
        onSessionEnded();
      }
    }
  };

  const handleRestartCall = () => {
    setCallEnded(false);
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
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          callEnded
            ? 'bg-slate-800 text-slate-400 border border-slate-700'
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {callEnded ? 'Session Ended' : 'Live Call'}
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
          <span className={`font-semibold text-[11px] ${callEnded ? 'text-slate-400' : 'text-emerald-400'}`}>
            {callEnded ? 'Call Terminated' : 'Active Call • Connected'}
          </span>
        </div>
      </div>

      {/* End / Restart Call Action Button */}
      <div className="pt-2 border-t border-slate-800">
        {callEnded ? (
          <button
            onClick={handleRestartCall}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Start Co-Pilot Stream</span>
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call Session</span>
          </button>
        )}
      </div>
    </div>
  );
}
