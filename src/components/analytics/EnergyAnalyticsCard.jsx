import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Zap,
  Sun,
  BatteryCharging,
  TrendingDown,
  ArrowUpRight,
  Gauge,
  Leaf,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function EnergyAnalyticsCard() {
  const { totalPowerKw, devices } = useDashboard();

  // Simulated power shares
  const powerFloat = parseFloat(totalPowerKw) || 2.4;
  const solarGenKw = 3.6;
  const batteryPct = 84;
  const netExport = (solarGenKw - powerFloat).toFixed(1);

  // Device sub-allocations
  const acWatts = devices.ac.isOn ? (devices.ac.mode === 'Eco' ? 650 : 1400) : 0;
  const geyserWatts = devices.geyser.isOn ? (devices.geyser.isPreheating ? 2400 : 2000) : 0;
  const lightingWatts = devices.livingLight.isOn
    ? Math.round((devices.livingLight.brightness / 100) * 65)
    : 0;
  const porchWatts = devices.porchLight.isOn ? 120 : 0;
  const baseloadWatts = 350;

  const totalCalculatedWatts = Math.max(1, acWatts + geyserWatts + lightingWatts + porchWatts + baseloadWatts);

  const hvacPct = Math.round((acWatts / totalCalculatedWatts) * 100);
  const waterPct = Math.round((geyserWatts / totalCalculatedWatts) * 100);
  const lightPct = Math.round(((lightingWatts + porchWatts) / totalCalculatedWatts) * 100);
  const basePct = 100 - (hvacPct + waterPct + lightPct);

  return (
    <section id="energy-analytics" className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-amber-950/20 backdrop-blur-md border border-amber-500/30 p-5 shadow-xl shadow-amber-950/20 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight">
              Real-Time Energy Telemetry
            </h2>
            <p className="text-xs text-amber-200/80">
              Solar microgrid balance, battery SOC & dynamic submetering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
            Net Surplus: +{netExport > 0 ? netExport : '0.0'} kW to Grid
          </span>
        </div>
      </div>

      {/* Grid of Microgrid Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Solar Generation */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/60 to-yellow-950/40 border border-amber-500/40 shadow-md">
          <div className="flex items-center justify-between text-xs text-amber-200">
            <span className="flex items-center gap-1.5 font-bold">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Solar PV Array</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-300 px-1.5 py-0.2 rounded bg-amber-500/20">
              Peak Gen
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
              3.6
            </span>
            <span className="text-xs text-amber-400 font-bold">kW Generating</span>
          </div>
          <div className="mt-1.5 text-[10px] text-amber-200/70 font-medium">
            12x 400W Monocrystalline
          </div>
        </div>

        {/* Battery Storage */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/60 to-teal-950/40 border border-cyan-500/40 shadow-md">
          <div className="flex items-center justify-between text-xs text-cyan-200">
            <span className="flex items-center gap-1.5 font-bold">
              <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
              <span>Powerwall Battery</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-cyan-300 px-1.5 py-0.2 rounded bg-cyan-500/20">
              Charging
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              {batteryPct}%
            </span>
            <span className="text-xs text-cyan-400 font-bold">/ 13.5 kWh</span>
          </div>
          <div className="mt-1.5 text-[10px] text-cyan-200/70 font-medium">
            9.2 hrs backup at current load
          </div>
        </div>

        {/* Net Tariff Rate */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-green-950/40 border border-emerald-500/40 shadow-md">
          <div className="flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-bold">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grid Tariff Tier</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-300 px-1.5 py-0.2 rounded bg-emerald-500/20">
              Off-Peak
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
              $0.11
            </span>
            <span className="text-xs text-emerald-400 font-bold">/ kWh</span>
          </div>
          <div className="mt-1.5 text-[10px] text-emerald-200/70 font-medium">
            Peak starts at 07:00 PM
          </div>
        </div>
      </div>

      {/* Multi-color Load Breakdown Bar */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 shadow-inner">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200">
            Dynamic Load Breakdown ({totalPowerKw} kW Active)
          </span>
          <span className="text-[11px] font-mono font-bold text-amber-300">
            Real-time submetering
          </span>
        </div>

        {/* Multi-segment colorful bar */}
        <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-[1px] shadow-md">
          <div
            title={`HVAC: ${hvacPct}%`}
            style={{ width: `${hvacPct}%` }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-sm"
          />
          <div
            title={`Water Heating: ${waterPct}%`}
            style={{ width: `${waterPct}%` }}
            className="bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 shadow-sm"
          />
          <div
            title={`Lighting: ${lightPct}%`}
            style={{ width: `${lightPct}%` }}
            className="bg-gradient-to-r from-yellow-300 to-amber-400 transition-all duration-500 shadow-sm"
          />
          <div
            title={`Baseload/Standby: ${basePct}%`}
            style={{ width: `${Math.max(0, basePct)}%` }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 shadow-sm"
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono font-semibold">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
            <span>HVAC: {hvacPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-300">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50" />
            <span>Geyser: {waterPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50" />
            <span>Lights: {lightPct}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-300">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
            <span>Base: {Math.max(0, basePct)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
