import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { ROOMS } from '../../data/mockData';
import ThemeSelector from '../common/ThemeSelector';
import {
  Clock,
  Filter,
  Bell,
  User,
  Menu,
  ChevronDown,
  Check,
  Sparkles,
  ShieldCheck,
  Radio,
  LogOut,
  Zap,
} from 'lucide-react';

export default function Header({ setMobileOpen }) {
  const { selectedRoom, setSelectedRoom, activityLogs, alertBanner, user, logout } = useDashboard();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Live Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Smart Energy & Automation Hub
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-300 hidden sm:block font-medium">
              Autonomous energy dispatch & real-time reactive smart environment
            </p>
          </div>
        </div>

        {/* Right: Clock, Room Filter Dropdown, Theme, Notifications, User Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Clock Indicator with Cyan Glow */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900/90 to-cyan-950/40 border border-cyan-500/30 text-slate-200 font-mono text-xs shadow-sm">
            <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="font-extrabold text-cyan-300">{formattedTime}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{formattedDate}</span>
          </div>

          {/* Room Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setRoomDropdownOpen(!roomDropdownOpen);
                setNotificationOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-900/90 to-emerald-950/40 hover:bg-slate-850 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-bold text-slate-100 transition-all shadow-sm"
            >
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span className="max-w-[100px] truncate">{selectedRoom}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roomDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setRoomDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl py-1.5 z-20 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-black text-cyan-400 tracking-wider border-b border-slate-800 mb-1">
                    Filter by Zone
                  </div>
                  {ROOMS.map((room) => {
                    const isSelected = selectedRoom === room;
                    return (
                      <button
                        key={room}
                        onClick={() => {
                          setSelectedRoom(room);
                          setRoomDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 font-bold border-l-2 border-emerald-400'
                            : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                        }`}
                      >
                        <span>{room}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Theme Option Dropdown */}
          <ThemeSelector />

          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setRoomDropdownOpen(false);
                setUserMenuOpen(false);
              }}
              className="relative p-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all shadow-sm"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {alertBanner ? (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                </span>
              ) : (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            {notificationOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setNotificationOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl p-3 z-20 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between px-2 py-1 pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">
                      Recent System Alerts
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      Active Monitoring
                    </span>
                  </div>

                  <div className="space-y-2 mt-2 max-h-60 overflow-y-auto pr-1">
                    {alertBanner && (
                      <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-xs shadow-md">
                        <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                          Security Alert Active
                        </div>
                        <p className="text-slate-200 text-[11px] mt-1 font-medium">{alertBanner.message}</p>
                      </div>
                    )}

                    {activityLogs.slice(0, 3).map((log) => (
                      <div
                        key={log.id}
                        className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-200">{log.device}</span>
                          <span className="text-[10px] font-mono text-cyan-300 font-semibold">{log.timestamp}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] mt-0.5 line-clamp-1">{log.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Badge & Dropdown */}
          <div className="relative pl-1.5 sm:pl-2 sm:border-l sm:border-slate-800">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setRoomDropdownOpen(false);
                setNotificationOpen(false);
              }}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-850 transition-colors group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[2px] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center font-black text-xs text-white">
                    {(user?.name || 'SR')
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-sm" />
              </div>

              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-none">
                  {user?.name || 'Sandesh Rasal'}
                </span>
                <span className="text-[10px] text-cyan-300 font-mono font-semibold mt-0.5">
                  {user?.role || 'Principal Admin'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-800 shadow-2xl p-3 z-20 animate-in fade-in zoom-in-95">
                  <div className="p-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{user?.name || 'Sandesh Rasal'}</p>
                    <p className="text-[11px] text-cyan-300 font-mono mt-0.5 truncate">{user?.email || 'admin@auraautomate.io'}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{user?.role || 'Principal Admin'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span>Sign Out / Lock Gateway</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
