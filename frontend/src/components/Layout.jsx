import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Enterprise Main Layout Component
 * Wraps top Header, side Sidebar navigation, and main view container.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 bg-slate-950 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
