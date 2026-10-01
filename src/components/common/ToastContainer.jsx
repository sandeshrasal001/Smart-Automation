import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, Zap } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useDashboard();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        const borderColor = isError
          ? 'border-rose-500/60 shadow-rose-500/20'
          : isWarning
          ? 'border-amber-500/60 shadow-amber-500/20'
          : isSuccess
          ? 'border-emerald-500/60 shadow-emerald-500/20'
          : 'border-cyan-500/60 shadow-cyan-500/20';

        const iconColor = isError
          ? 'text-rose-400'
          : isWarning
          ? 'text-amber-400'
          : isSuccess
          ? 'text-emerald-400'
          : 'text-cyan-400';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border ${borderColor} shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
          >
            <div className={`mt-0.5 shrink-0 ${iconColor}`}>
              {isError && <AlertCircle className="w-5 h-5" />}
              {isWarning && <AlertTriangle className="w-5 h-5" />}
              {isSuccess && <CheckCircle2 className="w-5 h-5" />}
              {!isError && !isWarning && !isSuccess && <Info className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-100 leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-100 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-800"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
