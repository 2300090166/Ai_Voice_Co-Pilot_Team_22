import React from 'react';
import { Mic, ShieldCheck, Activity, Bell, User } from 'lucide-react';

/**
 * Enterprise Header Component
 * Displays system status, product indicator, and agent quick actions.
 */
export default function Header() {
  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      {/* Brand & Product Info */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-lg text-white shadow-md shadow-sky-500/20">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-100 leading-tight">
            AI Voice Co-Pilot
          </h1>
          <p className="text-xs text-sky-400 font-medium">Inside Sales • Pay-in-3 Zero-Cost EMI</p>
        </div>
      </div>

      {/* System Status Indicators */}
      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Orchestrator Online</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Compliance Guard Active</span>
        </div>

        {/* User Profile Placeholder */}
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
          <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-600/80 border border-indigo-400/30 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            AG
          </div>
        </div>
      </div>
    </header>
  );
}
