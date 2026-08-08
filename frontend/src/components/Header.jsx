import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mic, Shield, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-lg text-white">
            <Bot className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-base text-slate-100 tracking-tight">AI Voice Co-Pilot</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
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
