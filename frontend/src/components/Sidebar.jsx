import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, PhoneCall, Bot, Database, Settings } from 'lucide-react';

/**
 * Enterprise Sidebar Navigation Component
 * Provides clean navigation links with active state highlighting.
 */
export default function Sidebar() {
  const navItems = [
    { label: 'Home Overview', path: '/', icon: Home },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Live Call Assistant', path: '/call-assistant', icon: PhoneCall },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Main Menu
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            System Agents
          </p>
          <div className="space-y-2 px-3 text-xs text-slate-400">
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center space-x-2">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Multi-Agent Engine</span>
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">7 Active</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>FAISS RAG Index</span>
              </span>
              <span className="text-slate-400 font-mono text-[10px]">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 px-3">
        <p className="font-semibold text-slate-400">AI Build Hackathon 2026</p>
        <p className="mt-0.5">Version 1.0.0 Enterprise</p>
      </div>
    </aside>
  );
}
