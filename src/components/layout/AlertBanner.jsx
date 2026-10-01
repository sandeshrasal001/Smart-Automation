import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { AlertTriangle, ShieldAlert, X, BellRing, ArrowRight } from 'lucide-react';

export default function AlertBanner() {
  const { alertBanner, dismissAlertBanner, setActiveTab } = useDashboard();

  if (!alertBanner) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-rose-950/90 via-red-900/80 to-rose-950/90 border border-rose-500/50 shadow-lg shadow-rose-950/40 rounded-2xl p-4 transition-all duration-300 animate-in fade-in slide-in-from-top-3">
      {/* Background glow & animated pulse bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 animate-pulse" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0">
            <ShieldAlert className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/30 text-rose-300 border border-rose-500/40">
                Security Incident
              </span>
              <span className="text-xs text-rose-200 font-mono font-medium">
                {alertBanner.timestamp}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5 tracking-tight">
              {alertBanner.title}
            </h4>
            <p className="text-xs text-rose-200/90 mt-0.5">
              {alertBanner.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => setActiveTab('Activity Log')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-white border border-rose-500/40 transition-colors"
          >
            <span>View Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={dismissAlertBanner}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-800/40 transition-colors"
            title="Acknowledge and dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
