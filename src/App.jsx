import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import AlertBanner from './components/layout/AlertBanner';
import TelemetryKpiGrid from './components/telemetry/TelemetryKpiGrid';
import DeviceControlGrid from './components/devices/DeviceControlGrid';
import RulesBuilder from './components/rules/RulesBuilder';
import EnergyAnalyticsCard from './components/analytics/EnergyAnalyticsCard';
import ActivityLogFeed from './components/logs/ActivityLogFeed';
import DemoSimulatorBar from './components/simulator/DemoSimulatorBar';
import ToastContainer from './components/common/ToastContainer';
import AuthGateway from './components/auth/AuthGateway';

function DashboardContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeTab, setActiveTab, isAuthenticated } = useDashboard();

  // If user is not authenticated, show colorful Sign In / Sign Up gateway
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased bg-ambient-mesh">
        <ToastContainer />
        <AuthGateway />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased relative overflow-x-hidden bg-ambient-mesh">
      {/* Ambient Color Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-64 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[130px]" />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Workspace (Offset for Desktop Sidebar) */}
      <div className="lg:pl-64 flex flex-col flex-1 pb-28 relative z-10">
        {/* Top Header */}
        <Header setMobileOpen={setMobileOpen} />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Motion Alert / Critical Security Banner */}
          <AlertBanner />

          {/* Section A: Telemetry KPI Grid (Top Row) */}
          <TelemetryKpiGrid />

          {/* Navigation Tab Filters if user selects specific view */}
          {activeTab !== 'Dashboard' && (
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 border border-cyan-500/30 shadow-md">
              <span className="text-xs text-slate-300 font-medium">
                Filtered view: <strong className="text-cyan-300 font-bold">{activeTab}</strong>
              </span>
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
              >
                Back to Full Dashboard View
              </button>
            </div>
          )}

          {/* Conditional or Unified View */}
          {(activeTab === 'Dashboard' || activeTab === 'Device Control') && (
            <DeviceControlGrid />
          )}

          {/* Two-Column Responsive Grid for Rules & Analytics / Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Automation Rules Builder (Hero Feature) */}
            {(activeTab === 'Dashboard' || activeTab === 'Automation Rules') && (
              <div
                className={`${
                  activeTab === 'Automation Rules'
                    ? 'lg:col-span-12'
                    : 'lg:col-span-7'
                }`}
              >
                <RulesBuilder />
              </div>
            )}

            {/* Right Column: Energy Analytics & Activity Log */}
            <div
              className={`space-y-6 ${
                activeTab === 'Automation Rules'
                  ? 'hidden'
                  : activeTab === 'Dashboard'
                  ? 'lg:col-span-5'
                  : 'lg:col-span-12'
              }`}
            >
              {(activeTab === 'Dashboard' || activeTab === 'Energy Analytics') && (
                <EnergyAnalyticsCard />
              )}

              {(activeTab === 'Dashboard' || activeTab === 'Activity Log') && (
                <ActivityLogFeed />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Fixed Demo Simulator Bar */}
      <DemoSimulatorBar />
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
