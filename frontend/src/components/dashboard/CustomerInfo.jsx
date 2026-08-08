import React, { useState } from 'react';
import { User, Phone, CreditCard, Clock, Activity, Tag, PhoneOff, Mic, MicOff, Play, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

/**
 * Customer Information Left Panel Component
 * Manages active call session state machine: Idle -> Streaming -> Paused -> Ended -> Idle.
 */
export default function CustomerInfo({
  sessionStatus = 'streaming',
  onStartSession,
  onPauseSession,
  onResumeSession,
  onEndSession
}) {
  const [loading, setLoading] = useState(false);

  const customer = {
    name: 'Alexander Wright',
    id: 'CUST-8921',
    phone: '+1 (555) 019-2834',
    product: 'Pay-in-3 Zero-Cost EMI',
    limit: '$1,500 Qualified',
    duration: sessionStatus === 'ended' ? '00m 00s' : '03m 42s'
  };

  const handleEndCallClick = async () => {
    setLoading(true);
    try {
      await axios.post('/api/v1/call/end', { session_id: 'sess_live_dashboard_01' });
    } catch (err) {
      console.warn('End call API notice:', err);
    } finally {
      setLoading(false);
      if (onEndSession) {
        onEndSession();
      }
    }
  };

  const renderStatusBadge = () => {
    switch (sessionStatus) {
      case 'streaming':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
            Streaming Live
          </span>
        );
      case 'paused':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Paused
          </span>
        );
      case 'ended':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
            Ended
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-800 text-slate-400 border border-slate-700">
            Standby
          </span>
        );
    }
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
        {renderStatusBadge()}
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
          <span className={`font-semibold text-[11px] ${sessionStatus === 'ended' ? 'text-slate-400' : 'text-emerald-400'}`}>
            {sessionStatus === 'ended' ? 'Call Terminated' : sessionStatus === 'paused' ? 'Call Paused' : 'Active Call • Connected'}
          </span>
        </div>
      </div>

      {/* Call Session Controls Engine */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        {sessionStatus === 'ended' || sessionStatus === 'idle' ? (
          /* Replaces Pause & End buttons with Start Co-Pilot Stream button when Ended/Idle */
          <button
            onClick={onStartSession}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Mic className="w-4 h-4" />
            <span>Start Co-Pilot Stream</span>
          </button>
        ) : (
          /* Pause & End Call Session Buttons when Streaming or Paused */
          <div className="space-y-2">
            {sessionStatus === 'streaming' ? (
              <button
                onClick={onPauseSession}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
              >
                <MicOff className="w-4 h-4" />
                <span>Pause Stream</span>
              </button>
            ) : (
              <button
                onClick={onResumeSession}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4" />
                <span>Resume Stream</span>
              </button>
            )}

            <button
              onClick={handleEndCallClick}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call Session</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
