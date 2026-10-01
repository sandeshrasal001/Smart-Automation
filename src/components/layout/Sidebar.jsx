import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ThemeSelector from '../common/ThemeSelector';
import {
  Zap,
  Sliders,
  Power,
  Activity,
  Shield,
  Layers,
  Radio,
  Cpu,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'Dashboard',
    label: 'Dashboard',
    icon: Layers,
    badge: null,
    activeColor: 'from-emerald-500/25 via-teal-500/20 to-cyan-500/15 text-emerald-300 border-emerald-400/50 shadow-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'Automation Rules',
    label: 'Automation Rules',
    icon: Sliders,
    badge: 'dynamic-rules',
    activeColor: 'from-purple-500/25 via-pink-500/20 to-indigo-500/15 text-purple-300 border-purple-400/50 shadow-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    id: 'Device Control',
    label: 'Device Control',
    icon: Power,
    badge: 'dynamic-devices',
    activeColor: 'from-cyan-500/25 via-blue-500/20 to-teal-500/15 text-cyan-300 border-cyan-400/50 shadow-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    id: 'Energy Analytics',
    label: 'Energy Analytics',
    icon: Zap,
    badge: '2.4 kW',
    activeColor: 'from-amber-500/25 via-orange-500/20 to-yellow-500/15 text-amber-300 border-amber-400/50 shadow-amber-500/10',
    iconColor: 'text-amber-400',
  },
  {
    id: 'Activity Log',
    label: 'Activity Log',
    icon: Activity,
    badge: 'Live',
    activeColor: 'from-indigo-500/25 via-cyan-500/20 to-blue-500/15 text-indigo-300 border-indigo-400/50 shadow-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { activeTab, setActiveTab, activeRulesCount, devices, logout, backendStatus } = useDashboard();

  const activeDeviceCount = Object.values(devices).filter((d) => d.isOn || d.isLocked).length;

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);

    const sectionElement = document.getElementById(id.toLowerCase().replace(/\s+/g, '-'));
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900/95 backdrop-blur-2xl border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Logo */}
        <div>
          <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <Zap className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -inset-1 rounded-2xl bg-emerald-500/25 blur-sm -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                AuraAutomate
              </span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-300/80 -mt-0.5">
                IoT Core v2.4
              </span>
            </div>
          </div>

          {/* Live Status Pill */}
          <div className="px-5 py-4">
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-950/80 to-cyan-950/60 border border-emerald-500/30 shadow-inner">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendStatus === 'connected' ? 'bg-emerald-400' : 'bg-cyan-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${backendStatus === 'connected' ? 'bg-emerald-500' : 'bg-cyan-500'}`}></span>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">
                    {backendStatus === 'connected' ? 'Gateway: Online' : 'Gateway: Active'}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono font-semibold">
                    {backendStatus === 'connected' ? 'Port 5000 • 12ms' : '14ms • Edge Sync'}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-sm ${
                backendStatus === 'connected'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}>
                {backendStatus === 'connected' ? 'API + WS' : 'MQTT'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1.5 mt-1">
            <div className="px-3 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Control Hub</span>
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              let badgeContent = item.badge;
              if (item.badge === 'dynamic-rules') {
                badgeContent = `${activeRulesCount} on`;
              } else if (item.badge === 'dynamic-devices') {
                badgeContent = `${activeDeviceCount} active`;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group border ${
                    isActive
                      ? `bg-gradient-to-r ${item.activeColor} shadow-md`
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? item.iconColor : 'text-slate-400 group-hover:text-cyan-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {badgeContent && (
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? 'bg-slate-950/60 text-white border border-white/20'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {badgeContent}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-all ${
                        isActive ? 'text-white translate-x-0' : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Diagnostics, Theme & Sign Out */}
        <div className="p-4 border-t border-slate-800">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-slate-950/80 to-indigo-950/30 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zigbee 3.0 Mesh</span>
              </span>
              <span className="text-emerald-300 font-mono font-bold text-[11px]">18 Nodes</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-[1px]">
              <div
                className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: '88%' }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-300 pt-0.5 font-medium">
              <span>Matter Protocol: Connected</span>
              <span className="text-emerald-300 font-mono font-bold">Channel 15</span>
            </div>
          </div>

          {/* Theme Option Pill */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Display Theme</span>
              </span>
              <span className="font-mono text-[10px] text-cyan-300 font-semibold">3 Styles</span>
            </div>
            <ThemeSelector compact={true} />
          </div>

          {/* Sign Out / Lock Session Action */}
          <button
            onClick={logout}
            className="w-full mt-2.5 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 transition-all group"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Lock Session / Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
