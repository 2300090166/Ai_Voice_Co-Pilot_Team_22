import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mic, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export default function Header() {
  const { demoMode, toggleDemoMode } = useDemo();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-lg text-white shadow-md shadow-sky-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-base text-slate-100 tracking-tight">AI Voice Co-Pilot</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-wider">
              SaaS Edition
            </span>
          </div>
        </Link>
      </div>

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

        <Link
          to="/voice-assistant"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>Voice AI Co-Pilot</span>
        </Link>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>Pay-in-3 Engine Online</span>
        </div>
      </div>
    </header>
  );
}
