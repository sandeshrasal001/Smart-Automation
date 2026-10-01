import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Moon, Sun, Sparkles, Check, ChevronDown, Palette } from 'lucide-react';

const THEMES = [
  {
    id: 'dark',
    label: 'Obsidian Dark',
    subtitle: 'Deep slate & high-contrast telemetry',
    icon: Moon,
    badgeColor: 'bg-slate-800 text-slate-300',
    dotColor: 'bg-emerald-400',
  },
  {
    id: 'light',
    label: 'Daylight Light',
    subtitle: 'Clean white surfaces & daylight clarity',
    icon: Sun,
    badgeColor: 'bg-amber-500/20 text-amber-500',
    dotColor: 'bg-amber-400',
  },
  {
    id: 'cyber',
    label: 'Cyberpunk Neon',
    subtitle: 'Deep midnight purple & radiant glow',
    icon: Sparkles,
    badgeColor: 'bg-purple-500/20 text-purple-400',
    dotColor: 'bg-cyan-400',
  },
];

export default function ThemeSelector({ compact = false }) {
  const { theme, changeTheme } = useDashboard();
  const [open, setOpen] = useState(false);

  const currentTheme = THEMES.find((t) => t.id === theme) || THEMES[0];
  const CurrentIcon = currentTheme.icon;

  if (compact) {
    // Quick 3-button pill for Sidebar
    return (
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/70 border border-slate-800">
        {THEMES.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => changeTheme(t.id)}
              title={t.label}
              className={`flex-1 flex items-center justify-center p-1.5 rounded-lg text-xs transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition-all shadow-sm"
        aria-label="Theme selector"
      >
        <CurrentIcon className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden md:inline-block max-w-[90px] truncate">{currentTheme.label}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800 shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95">
            <div className="px-3 py-1.5 border-b border-slate-800/80 mb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Display Theme
              </span>
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            <div className="space-y-1">
              {THEMES.map((t) => {
                const Icon = t.icon;
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      changeTheme(t.id);
                      setOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-850 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${t.badgeColor}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold leading-tight">{t.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{t.subtitle}</div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
