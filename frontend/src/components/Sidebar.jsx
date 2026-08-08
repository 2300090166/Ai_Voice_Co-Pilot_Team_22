import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PhoneCall, Home as HomeIcon, Mic, BarChart3, Sparkles } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Home Overview', path: '/', icon: HomeIcon },
    { name: 'Enterprise Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Call Assistant Feed', path: '/call-assistant', icon: PhoneCall },
    { name: 'Voice AI Co-Pilot', path: '/voice-assistant', icon: Mic },
    { name: 'Analytics & Insights', path: '/analytics', icon: BarChart3 }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 hidden md:flex flex-col space-y-6">
      <div className="flex items-center space-x-2 px-2 pt-2">
        <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400 border border-sky-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-sm text-slate-100 tracking-tight">AI Sales Co-Pilot</span>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`
              }
            >
              <IconComponent className="w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
        <p className="font-bold text-slate-200">Hackathon Edition</p>
        <p className="text-[10px] text-slate-500">Team 22 • Pay-in-3 EMI</p>
      </div>
    </aside>
  );
}
