import React from 'react';

/**
 * Reusable Glassmorphism Card Component
 * Provides clean enterprise container styling with subtle borders and shadows.
 */
export default function Card({ title, subtitle, children, className = '', headerAction }) {
  return (
    <div className={`bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
          <div>
            {title && <h3 className="text-lg font-semibold text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
