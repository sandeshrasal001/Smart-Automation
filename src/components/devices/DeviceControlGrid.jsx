import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import SmartAcCard from './SmartAcCard';
import LightingCard from './LightingCard';
import GeyserCard from './GeyserCard';
import DoorLockCard from './DoorLockCard';
import PorchLightCard from './PorchLightCard';
import { Power, Filter, CheckCircle2 } from 'lucide-react';

export default function DeviceControlGrid() {
  const { selectedRoom, setSelectedRoom, devices } = useDashboard();

  // Filter device cards based on selected room
  // Living Room: ac, livingLight
  // Garage: geyser, doorLock, porchLight
  // Bedroom: ac
  const shouldShow = (deviceKey) => {
    if (selectedRoom === 'All Rooms') return true;
    const room = devices[deviceKey]?.room;
    if (selectedRoom === 'Bedroom') {
      return deviceKey === 'ac'; // Dual AC handles Bedroom/Living
    }
    return room === selectedRoom;
  };

  const visibleCount = [
    shouldShow('ac'),
    shouldShow('livingLight'),
    shouldShow('geyser'),
    shouldShow('doorLock'),
    shouldShow('porchLight'),
  ].filter(Boolean).length;

  return (
    <section id="device-control" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
            <Power className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 tracking-tight">
              Interactive Device Control Grid
            </h2>
            <p className="text-xs text-slate-400">
              Direct telemetry feedback, hardware actuators, and power states
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400">Filtering:</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-mono">
            {selectedRoom} ({visibleCount} devices)
          </span>
          {selectedRoom !== 'All Rooms' && (
            <button
              onClick={() => setSelectedRoom('All Rooms')}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Grid of Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {shouldShow('ac') && <SmartAcCard />}
        {shouldShow('livingLight') && <LightingCard />}
        {shouldShow('geyser') && <GeyserCard />}
        {shouldShow('doorLock') && <DoorLockCard />}
        {shouldShow('porchLight') && <PorchLightCard />}
      </div>
    </section>
  );
}
