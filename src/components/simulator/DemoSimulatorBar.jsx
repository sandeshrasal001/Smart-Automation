import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Flame,
  ShieldAlert,
  Leaf,
  RefreshCw,
  Sparkles,
  Zap,
  Radio,
} from 'lucide-react';

export default function DemoSimulatorBar() {
  const {
    simulateHeatwave,
    simulateMotionAlert,
    activateEcoMode,
    resetDemo,
  } = useDashboard();

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-72 md:right-8 z-40">
      <div className="mx-auto max-w-5xl rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 p-3 sm:p-4 glow-cyan">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Label & Status Badge */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30">
              <Zap className="w-5 h-5 fill-white animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Hackathon Demo Simulator
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40">
                  Live Edge Trigger
                </span>
              </div>
              <p className="text-[11px] text-cyan-200/80 hidden sm:block font-medium">
                Execute real-time autonomous conditions to evaluate rule engine reactive responses
              </p>
            </div>
          </div>

          {/* 3 Quick-Trigger Action Buttons + Reset */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* 1. Simulate Heatwave (30°C) */}
            <button
              onClick={simulateHeatwave}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:brightness-110 border border-amber-300/40 shadow-lg shadow-orange-500/30 transition-all active:scale-95 group"
            >
              <Flame className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Simulate Heatwave (30°C)</span>
            </button>

            {/* 2. Simulate Motion Alert */}
            <button
              onClick={simulateMotionAlert}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:brightness-110 border border-rose-300/40 shadow-lg shadow-rose-600/30 transition-all active:scale-95 group"
            >
              <ShieldAlert className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Simulate Motion Alert</span>
            </button>

            {/* 3. Activate Eco-Mode */}
            <button
              onClick={activateEcoMode}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:brightness-110 border border-emerald-300/40 shadow-lg shadow-emerald-500/30 transition-all active:scale-95 group"
            >
              <Leaf className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Activate Eco-Mode</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={resetDemo}
              title="Reset system to clean baseline"
              className="p-2.5 rounded-xl text-cyan-300 hover:text-white bg-slate-800/90 hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-400 shadow-md transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4 hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
