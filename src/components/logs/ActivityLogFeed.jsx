import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Activity,
  Thermometer,
  Sun,
  Flame,
  Lock,
  Unlock,
  Shield,
  Zap,
  Sliders,
  RefreshCw,
  Plus,
  Trash2,
  Filter,
} from 'lucide-react';

const ICON_MAP = {
  Thermometer,
  Sun,
  Flame,
  Lock,
  Unlock,
  Shield,
  Zap,
  Sliders,
  RefreshCw,
  Plus,
};

const DEVICE_COLOR_MAP = {
  'Smart AC': 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/30',
  'Living Room Lighting': 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-white shadow-sm shadow-amber-500/30',
  'Smart Geyser': 'bg-gradient-to-tr from-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/30',
  'Smart Door Lock': 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/30',
  'Porch Floodlight': 'bg-gradient-to-tr from-violet-500 to-indigo-600 text-white shadow-sm shadow-violet-500/30',
  'Gateway Router': 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-sm shadow-indigo-500/30',
  'Solar Controller': 'bg-gradient-to-tr from-yellow-400 to-amber-500 text-white shadow-sm shadow-amber-500/30',
  'Security Gateway': 'bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white shadow-sm shadow-emerald-500/30',
  'Rules Engine': 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-sm shadow-purple-500/30',
};

export default function ActivityLogFeed() {
  const { activityLogs } = useDashboard();
  const [filterType, setFilterType] = useState('All');

  const filteredLogs =
    filterType === 'All'
      ? activityLogs
      : activityLogs.filter((log) => log.type === filterType);

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'Automated':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm';
      case 'Manual':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm';
      case 'Safety Override':
        return 'bg-rose-500/25 text-rose-300 border-rose-500/50 animate-pulse shadow-sm shadow-rose-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="activity-log" className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-indigo-950/25 backdrop-blur-md border border-cyan-500/30 p-5 shadow-xl shadow-cyan-950/20 flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Real-Time Activity Log Feed
              </h2>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
            </div>
            <p className="text-xs text-cyan-200/80">
              Live audit stream from edge sensors, rule engine & cloud gateway
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Automated', 'Manual', 'Safety Override'].map((type) => {
            const isSelected = filterType === type;
            let activeColor = 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400';
            if (type === 'Manual') activeColor = 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-purple-400';
            if (type === 'Safety Override') activeColor = 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-400';

            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                  isSelected
                    ? `${activeColor} shadow-md scale-105`
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable Timeline Stream */}
      <div className="mt-4 overflow-y-auto flex-1 pr-1.5 space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs py-8">
            <Activity className="w-8 h-8 stroke-1 mb-2 text-slate-500" />
            <span>No activity recorded under this filter.</span>
          </div>
        ) : (
          filteredLogs.map((log, index) => {
            const Icon = ICON_MAP[log.icon] || Activity;
            const badgeStyle = getBadgeStyle(log.type);
            const avatarStyle = DEVICE_COLOR_MAP[log.device] || 'bg-slate-800 text-cyan-400';

            return (
              <div
                key={log.id || index}
                className="relative flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/70 hover:bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 transition-all hover:scale-[1.005] shadow-sm"
              >
                {/* Colorful Device Avatar */}
                <div className={`p-2.5 rounded-xl shrink-0 ${avatarStyle}`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white">
                        {log.device}
                      </span>
                      {/* Trigger Type Pill */}
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}
                      >
                        {log.type}
                      </span>
                    </div>

                    {/* Timestamp Badge */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-medium text-cyan-300/80">
                      <span>{log.timestamp}</span>
                      <span className="text-slate-600">•</span>
                      <span>{log.relativeTime || 'Recent'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                    {log.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
