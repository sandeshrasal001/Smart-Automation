import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Lock, Unlock, Shield, ShieldAlert, BatteryCharging, KeyRound } from 'lucide-react';

export default function DoorLockCard() {
  const { devices, toggleDoorLock } = useDashboard();
  const lock = devices.doorLock;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300 p-5 flex flex-col justify-between ${
        lock.isLocked
          ? 'bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-teal-950/50 border-emerald-500/50 shadow-xl shadow-emerald-950/40 glow-emerald'
          : 'bg-gradient-to-br from-rose-950/70 via-slate-900/90 to-red-950/60 border-rose-500/70 shadow-xl shadow-rose-950/50 glow-rose animate-pulse'
      }`}
    >
      {/* Decorative Radial Accent */}
      <div
        className={`absolute top-0 right-0 w-36 h-36 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12 ${
          lock.isLocked ? 'bg-emerald-500/15' : 'bg-rose-500/25'
        }`}
      />

      <div>
        {/* Header with Title & Battery */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl transition-all duration-300 text-white shadow-lg ${
                lock.isLocked
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-emerald-500/30 ring-2 ring-emerald-400/30'
                  : 'bg-gradient-to-tr from-rose-500 to-red-600 shadow-rose-500/40 ring-2 ring-rose-400/40'
              }`}
            >
              {lock.isLocked ? (
                <Shield className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm tracking-tight">
                {lock.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-emerald-200/80 font-medium">{lock.room}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AES-256
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300 shadow-sm">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lock.batteryPercent}%</span>
          </div>
        </div>

        {/* Central Status Indicator */}
        <div
          className={`mt-5 p-5 rounded-xl border relative z-10 flex flex-col items-center justify-center text-center shadow-inner ${
            lock.isLocked
              ? 'bg-slate-950/70 border-emerald-500/30'
              : 'bg-rose-950/40 border-rose-500/50'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 mb-2.5 shadow-lg ${
              lock.isLocked
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-emerald-500/30'
                : 'bg-gradient-to-tr from-rose-500 to-red-600 text-white border-rose-400/60 shadow-rose-500/40 animate-bounce'
            }`}
          >
            {lock.isLocked ? (
              <Lock className="w-7 h-7" />
            ) : (
              <Unlock className="w-7 h-7" />
            )}
          </div>

          <div
            className={`text-base font-black tracking-wider ${
              lock.isLocked
                ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                : 'text-rose-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]'
            }`}
          >
            {lock.isLocked ? 'SECURELY LOCKED' : 'DOOR UNLOCKED'}
          </div>
          <div className="text-xs text-slate-300 mt-0.5 font-medium">
            {lock.lastAccessed}
          </div>
        </div>

        {/* Toggle Lock Action Button */}
        <div className="mt-4 relative z-10">
          <button
            onClick={toggleDoorLock}
            className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
              lock.isLocked
                ? 'bg-slate-800/90 hover:bg-slate-750 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-md'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 text-white shadow-xl shadow-emerald-500/40 hover:brightness-110'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{lock.isLocked ? 'Tap to Unlock Deadbolt' : 'Lock Deadbolt Now'}</span>
          </button>
        </div>
      </div>

      {/* Auto-Relock Tag */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 relative z-10">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Auto-Relock Active</span>
        </span>
        <span className="text-[11px] font-mono font-bold text-emerald-300">Timeout: 30s</span>
      </div>
    </div>
  );
}
