import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import AddRuleModal from './AddRuleModal';
import {
  Sliders,
  Plus,
  Trash2,
  Clock,
  Zap,
  ArrowRight,
  Shield,
  Thermometer,
  Sun,
  Flame,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const CATEGORY_STYLES = {
  Climate: {
    border: 'border-l-4 border-l-cyan-400 border-cyan-500/30',
    bg: 'bg-gradient-to-r from-cyan-950/30 via-slate-900/90 to-slate-900/80',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    iconColor: 'text-cyan-400',
  },
  Security: {
    border: 'border-l-4 border-l-rose-400 border-rose-500/30',
    bg: 'bg-gradient-to-r from-rose-950/30 via-slate-900/90 to-slate-900/80',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    iconColor: 'text-rose-400',
  },
  Energy: {
    border: 'border-l-4 border-l-emerald-400 border-emerald-500/30',
    bg: 'bg-gradient-to-r from-emerald-950/30 via-slate-900/90 to-slate-900/80',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  Lighting: {
    border: 'border-l-4 border-l-amber-400 border-amber-500/30',
    bg: 'bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-slate-900/80',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    iconColor: 'text-amber-400',
  },
  Comfort: {
    border: 'border-l-4 border-l-purple-400 border-purple-500/30',
    bg: 'bg-gradient-to-r from-purple-950/30 via-slate-900/90 to-slate-900/80',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    iconColor: 'text-purple-400',
  },
};

export default function RulesBuilder() {
  const { rules, toggleRule, deleteRule, activeRulesCount } = useDashboard();
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Climate', 'Security', 'Energy', 'Lighting', 'Comfort'];

  const filteredRules =
    categoryFilter === 'All'
      ? rules
      : rules.filter((r) => r.category === categoryFilter);

  return (
    <section id="automation-rules" className="space-y-4">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-cyan-950/70 border border-emerald-500/40 shadow-xl shadow-emerald-950/30">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30">
            <Sliders className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">
                Automation Rules Builder
              </h2>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                {activeRulesCount} of {rules.length} Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Deterministic IF / THEN autonomous logic engine with sub-second edge triggering
            </p>
          </div>
        </div>

        {/* Action Button: + Add Rule */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/30 transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Rule</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isSelected = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Rules Visual List */}
      <div className="space-y-3">
        {filteredRules.map((rule) => {
          const style = CATEGORY_STYLES[rule.category] || CATEGORY_STYLES.Climate;

          return (
            <div
              key={rule.id}
              className={`group relative rounded-2xl backdrop-blur-md border transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                rule.enabled
                  ? `${style.bg} ${style.border} shadow-lg hover:shadow-xl hover:scale-[1.005]`
                  : 'bg-slate-900/40 border-slate-800/60 opacity-60'
              }`}
            >
              {/* Left Details: Category tag, Name, Logic Visual Flow */}
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${style.badge}`}>
                    {rule.category || 'General'}
                  </span>
                  <h3 className="text-sm font-extrabold text-white truncate">
                    {rule.name}
                  </h3>
                  {rule.enabled && (
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                  )}
                </div>

                {/* IF / THEN Logic Block */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* IF Trigger */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 text-cyan-200 shadow-sm">
                    <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-cyan-500/25 text-cyan-300 border border-cyan-500/30">
                      IF
                    </span>
                    <span className="font-semibold">{rule.trigger}</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block" />

                  {/* THEN Action */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-emerald-200 shadow-sm">
                    <span className="text-[10px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300 border border-emerald-500/30">
                      THEN
                    </span>
                    <span className="font-semibold">{rule.action}</span>
                  </div>
                </div>

                {/* Constraint & Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-300 pt-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{rule.timeConstraint}</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-400">
                    Triggered {rule.triggerCount || 0} times
                  </div>
                </div>
              </div>

              {/* Right: Controls (Toggle & Delete) */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-slate-300">
                    {rule.enabled ? 'Enabled' : 'Paused'}
                  </span>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    aria-label={`Toggle ${rule.name}`}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      rule.enabled
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-md shadow-emerald-500/50'
                        : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        rule.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Trash/Delete button */}
                <button
                  onClick={() => deleteRule(rule.id)}
                  title="Delete rule"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <AddRuleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
