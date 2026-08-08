import React, { useState, useEffect } from 'react';
import { Mic, ShieldCheck, Activity, Bell, Radio, ToggleLeft, ToggleRight, Clock } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

/**
 * Enterprise Top Navbar Component
 * Displays branding, active call indicator, Demo Mode toggle, and real-time clock.
 */
export default function TopNavbar() {
  const { demoMode, toggleDemoMode } = useDemo();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      {/* Brand & Product Title */}
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-lg text-white shadow-md shadow-sky-500/20">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-extrabold text-slate-100 tracking-tight">
              AI Voice Co-Pilot
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
              Enterprise SaaS
            </span>
          </div>
          <p className="text-xs text-slate-400">Inside Sales • Pay-in-3 Zero-Cost EMI</p>
        </div>
      </div>

      {/* Center Status & Real-Time Clock */}
      <div className="hidden md:flex items-center space-x-5">
        <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>Active Call • Live Stream</span>
        </div>

        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-lg text-xs text-slate-300">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono">{timeStr}</span>
        </div>
      </div>

      {/* Right Controls: Demo Mode Toggle & User Profile */}
      <div className="flex items-center space-x-4">
        {/* Demo Mode Toggle */}
        <button
          onClick={toggleDemoMode}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
            demoMode
              ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
          title="Toggle Hackathon Demo Data Mode"
        >
          {demoMode ? (
            <ToggleRight className="w-5 h-5 text-indigo-400" />
          ) : (
            <ToggleLeft className="w-5 h-5 text-slate-500" />
          )}
          <span>Demo Mode: <strong className={demoMode ? 'text-indigo-400' : 'text-slate-500'}>{demoMode ? 'ON' : 'OFF'}</strong></span>
        </button>

        <div className="flex items-center space-x-3 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
            AG
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">Alex Greyson</p>
            <p className="text-[10px] text-slate-400">Senior Sales Rep</p>
          </div>
        </div>
      </div>
    </header>
  );
}
