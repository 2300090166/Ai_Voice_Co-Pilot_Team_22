import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

/**
 * AI Consent & Privacy Banner Component
 * Displays privacy consent notice at the top of active call conversations.
 */
export default function ConsentBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-between text-xs transition-all">
      <div className="flex items-center space-x-2 text-slate-300">
        <div className="p-1 bg-indigo-500/10 rounded border border-indigo-500/30 text-indigo-400">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <span>
          <strong className="text-slate-100 font-semibold">AI Consent Notice:</strong> This conversation may be recorded and AI-assisted in real time to improve customer experience and ensure compliance.
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-slate-400 hover:text-slate-200 transition-colors p-1"
        title="Dismiss notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
