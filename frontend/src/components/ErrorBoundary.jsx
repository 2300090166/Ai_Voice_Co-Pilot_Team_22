import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * React Error Boundary Component
 * Catches JavaScript errors anywhere in its child component tree and displays a fallback UI
 * instead of crashing the entire application into a blank screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-slate-900 border border-red-500/30 rounded-xl space-y-2 text-xs text-red-300">
          <div className="flex items-center space-x-2 font-bold text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Component Fallback (Recovered from error)</span>
          </div>
          <p className="text-slate-400 font-mono text-[11px]">
            {this.state.error?.toString() || 'An error occurred while rendering this card.'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
