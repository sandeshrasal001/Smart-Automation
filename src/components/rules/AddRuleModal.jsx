import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { X, Plus, Sparkles, Sliders, Clock, Zap, Shield, Check } from 'lucide-react';

const TRIGGER_PRESETS = [
  'Indoor Temp > 28°C',
  'Motion Detected in Porch AND Time > 10:00 PM',
  'Solar Storage > 80%',
  'Indoor Humidity > 65%',
  'Door Unlocked > 15 mins',
  'Grid Peak Tariff Alert',
];

const ACTION_PRESETS = [
  'Turn ON Smart AC (Set to 24°C)',
  'Turn ON Porch Floodlight',
  'Start EV Charger (Eco Mode)',
  'Preheat Geyser to 60°C',
  'Dim Living Lights to 20%',
  'Auto-Lock Deadbolt & Siren Pulse',
];

const TIME_PRESETS = [
  'All Day',
  '10:00 PM - 06:00 AM',
  'Peak Solar (11:00 AM - 04:00 PM)',
  '06:00 AM - 09:00 AM',
  'Sunset to Midnight',
];

export default function AddRuleModal({ isOpen, onClose }) {
  const { addRule } = useDashboard();

  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');
  const [timeConstraint, setTimeConstraint] = useState('All Day');
  const [category, setCategory] = useState('Climate');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trigger.trim() || !action.trim()) {
      setError('Please provide both a Trigger Condition and a Device Action.');
      return;
    }

    addRule({
      name: name.trim() || `IF ${trigger} THEN ${action}`,
      trigger: trigger.trim(),
      action: action.trim(),
      timeConstraint: timeConstraint.trim() || 'All Day',
      category,
    });

    // Reset and close
    setName('');
    setTrigger('');
    setAction('');
    setTimeConstraint('All Day');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-emerald-500/10 p-6 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Create Automation Rule
              </h3>
              <p className="text-xs text-slate-400">
                Define visual IF / THEN logic for autonomous IoT execution
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Rule Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Rule Friendly Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Living Room Heat Wave Guard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 transition-colors"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Domain Category
            </label>
            <div className="flex flex-wrap gap-2">
              {['Climate', 'Security', 'Energy', 'Lighting', 'Comfort'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    category === cat
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Condition (IF) */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                  IF
                </span>
                Trigger Condition
              </label>
              <span className="text-[10px] text-slate-400">Sensor or Metric Event</span>
            </div>

            <input
              type="text"
              required
              placeholder="e.g. Indoor Temp > 28°C"
              value={trigger}
              onChange={(e) => {
                setTrigger(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-750 text-slate-100 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
            />

            {/* Quick Trigger Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {TRIGGER_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setTrigger(p)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 hover:bg-slate-750 text-slate-300 hover:text-cyan-300 transition-colors border border-slate-750"
                >
                  + {p}
                </button>
              ))}
            </div>
          </div>

          {/* Device Action (THEN) */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  THEN
                </span>
                Device Action
              </label>
              <span className="text-[10px] text-slate-400">Actuator Command</span>
            </div>

            <input
              type="text"
              required
              placeholder="e.g. Turn ON Smart AC (Set to 24°C)"
              value={action}
              onChange={(e) => {
                setAction(e.target.value);
                setError('');
              }}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-750 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
            />

            {/* Quick Action Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ACTION_PRESETS.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setAction(p)}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 hover:bg-slate-750 text-slate-300 hover:text-emerald-300 transition-colors border border-slate-750"
                >
                  + {p}
                </button>
              ))}
            </div>
          </div>

          {/* Time Constraint */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Time Constraint / Execution Window</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 10:00 PM - 06:00 AM or All Day"
              value={timeConstraint}
              onChange={(e) => setTimeConstraint(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-amber-400 placeholder:text-slate-500 transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {TIME_PRESETS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTimeConstraint(t)}
                  className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors ${
                    timeConstraint === t
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Push Rule to Engine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
