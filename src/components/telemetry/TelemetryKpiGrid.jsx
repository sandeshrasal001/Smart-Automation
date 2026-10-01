import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Zap,
  Sliders,
  DollarSign,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Activity,
  CheckCircle2,
  Droplets,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export default function TelemetryKpiGrid() {
  const { totalPowerKw, activeRulesCount, monthlySavings, indoorTemp, indoorHumidity, climateStatus } =
    useDashboard();

  const isHeatwave = indoorTemp >= 28;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Power Draw (Vibrant Cyan / Blue Theme) */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950/70 via-slate-900/90 to-blue-950/50 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400 p-5 transition-all duration-300 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/20">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Total Power Draw
          </span>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 fill-white" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2 relative z-10">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            {totalPowerKw}
          </span>
          <span className="text-sm font-bold text-cyan-400">kW</span>
        </div>

        {/* Trend badge & Subtext */}
        <div className="mt-3 flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
            <TrendingDown className="w-3 h-3" />
            <span>-12% vs yesterday</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-200/70">Peak: 4.8 kW</span>
        </div>

        {/* Live Power Bar */}
        <div className="mt-3.5 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 rounded-full transition-all duration-500 shadow-md shadow-cyan-400/50"
            style={{ width: `${Math.min(100, (parseFloat(totalPowerKw) / 5.0) * 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Active Automation Rules (Vibrant Emerald / Mint Theme) */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900/90 to-teal-950/50 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 p-5 transition-all duration-300 shadow-xl shadow-emerald-950/40 hover:shadow-emerald-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Automation Rules
          </span>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
            <Sliders className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2 relative z-10">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {activeRulesCount}
          </span>
          <span className="text-sm font-bold text-emerald-400">Rules Active</span>
        </div>

        {/* Status badge */}
        <div className="mt-3 flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Running smoothly</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-200/70">Sub-second Latency</span>
        </div>

        {/* Dot track */}
        <div className="mt-3.5 flex items-center gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i < activeRulesCount
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 shadow-sm shadow-emerald-400/50'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3. Monthly Energy Savings (Vibrant Solar Amber / Gold Theme) */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900/90 to-orange-950/50 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 p-5 transition-all duration-300 shadow-xl shadow-amber-950/40 hover:shadow-amber-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Monthly Energy Savings
          </span>
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-1.5 relative z-10">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            ${monthlySavings.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-amber-300/90">this cycle</span>
        </div>

        {/* Trend badge */}
        <div className="mt-3 flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
            <TrendingUp className="w-3 h-3" />
            <span>+18% efficiency</span>
          </div>
          <span className="text-[11px] font-mono text-amber-200/70">Solar + Off-Peak</span>
        </div>

        {/* Efficiency bar */}
        <div className="mt-3.5 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 rounded-full transition-all duration-500 shadow-md shadow-amber-400/50"
            style={{ width: '74%' }}
          />
        </div>
      </div>

      {/* 4. Indoor Climate (Dynamic Indigo/Violet or Fiery Rose Heatwave) */}
      <div
        className={`relative group overflow-hidden rounded-2xl backdrop-blur-md border p-5 transition-all duration-300 shadow-xl ${
          isHeatwave
            ? 'bg-gradient-to-br from-rose-950/80 via-slate-900/90 to-orange-950/70 border-rose-500/60 shadow-rose-950/50 hover:shadow-rose-500/30'
            : 'bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/50 border-indigo-500/40 hover:border-indigo-400 shadow-indigo-950/40 hover:shadow-indigo-500/20'
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 ${
            isHeatwave ? 'bg-rose-500/20' : 'bg-indigo-500/15'
          }`}
        />

        <div className="flex items-center justify-between relative z-10">
          <span
            className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isHeatwave ? 'text-rose-300' : 'text-indigo-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isHeatwave ? 'bg-rose-400' : 'bg-indigo-400'
              }`}
            />
            Indoor Climate
          </span>
          <div
            className={`p-2.5 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform ${
              isHeatwave
                ? 'bg-gradient-to-tr from-rose-500 to-amber-500 shadow-rose-500/30'
                : 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-indigo-500/30'
            }`}
          >
            <Thermometer className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2 relative z-10">
          <span
            className={`text-3xl sm:text-4xl font-black tracking-tight font-mono ${
              isHeatwave
                ? 'text-rose-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                : 'text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]'
            }`}
          >
            {indoorTemp}°C
          </span>
          <span className="text-sm font-bold text-slate-300">
            / {indoorHumidity}% Hum
          </span>
        </div>

        {/* Badge */}
        <div className="mt-3 flex items-center justify-between relative z-10">
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              isHeatwave
                ? 'bg-rose-500/25 text-rose-200 border-rose-500/50 animate-pulse shadow-sm'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm'
            }`}
          >
            {isHeatwave ? <AlertTriangle className="w-3 h-3 text-rose-300" /> : <CheckCircle2 className="w-3 h-3 text-indigo-300" />}
            <span>{isHeatwave ? 'Heatwave Alert' : 'Optimal Comfort'}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300">
            <Droplets className="w-3 h-3 text-cyan-400" />
            <span>Dew: 12°C</span>
          </div>
        </div>

        {/* Climate status bar */}
        <div className="mt-3.5 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-[1px]">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isHeatwave
                ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 shadow-md shadow-rose-500/50'
                : 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/50'
            }`}
            style={{ width: `${Math.min(100, (indoorTemp / 35) * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
