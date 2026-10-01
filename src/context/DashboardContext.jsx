import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client';
import { api } from '../services/api';
import { INITIAL_DEVICES, INITIAL_RULES, INITIAL_ACTIVITY_LOGS } from '../data/mockData';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  // Backend & WebSocket Status
  const [backendStatus, setBackendStatus] = useState('checking');
  const [socket, setSocket] = useState(null);

  // Device States
  const [devices, setDevices] = useState(INITIAL_DEVICES);

  // Climate state
  const [indoorTemp, setIndoorTemp] = useState(24);
  const [indoorHumidity, setIndoorHumidity] = useState(48);
  const [climateStatus, setClimateStatus] = useState('Optimal Comfort');

  // Rules state
  const [rules, setRules] = useState(INITIAL_RULES);

  // Activity logs
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);

  // Navigation & Filtering
  const [selectedRoom, setSelectedRoom] = useState('All Rooms');
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Alert Banner state (for motion alert & critical warnings)
  const [alertBanner, setAlertBanner] = useState(null);

  // Toast Notification state
  const [toasts, setToasts] = useState([]);

  // Energy stats
  const [monthlySavings, setMonthlySavings] = useState(48.50);

  // Theme State: 'dark' | 'light' | 'cyber'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aura_theme') || 'dark';
  });

  // Apply theme attributes to documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    const themeLabels = {
      dark: '🌙 Obsidian Dark',
      light: '☀️ Daylight Light',
      cyber: '⚡ Cyberpunk Neon',
    };
    addToast({
      type: 'info',
      title: 'Theme Switched',
      message: `Theme set to ${themeLabels[newTheme] || newTheme}.`,
    });
  };

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('aura_auth') === 'true';
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Sandesh Rasal',
          email: 'admin@auraautomate.io',
          role: 'Principal Admin',
        };
  });

  // Toast Helper
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast = { id, ...toast, timestamp: Date.now() };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Helper to add activity log
  const addLog = useCallback((log) => {
    const newLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      relativeTime: 'Just now',
      status: 'info',
      ...log,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  }, []);

  // Connect to Express + Socket.IO Backend
  useEffect(() => {
    let s;
    try {
      const backendUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) || 'http://localhost:5000';
      s = io(backendUrl, {
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 4000,
      });

      s.on('connect', () => {
        setBackendStatus('connected');
      });

      s.on('connect_error', () => {
        setBackendStatus('offline');
      });

      s.on('disconnect', () => {
        setBackendStatus('offline');
      });

      s.on('state:init', (initState) => {
        if (initState && initState.devices) {
          setDevices(initState.devices);
        }
      });

      s.on('device:updated', ({ id, device }) => {
        if (id && device) {
          setDevices((prev) => ({ ...prev, [id]: device }));
        }
      });

      s.on('log:new', (newLog) => {
        if (newLog) {
          setActivityLogs((prev) => [newLog, ...prev.filter((l) => l.id !== newLog.id)]);
        }
      });

      s.on('state:synced', (syncedState) => {
        if (syncedState) {
          if (syncedState.devices) setDevices(syncedState.devices);
          if (syncedState.indoorTemp !== undefined) setIndoorTemp(syncedState.indoorTemp);
          if (syncedState.indoorHumidity !== undefined) setIndoorHumidity(syncedState.indoorHumidity);
          if (syncedState.climateStatus) setClimateStatus(syncedState.climateStatus);
          if (syncedState.alertBanner !== undefined) setAlertBanner(syncedState.alertBanner);
        }
      });

      setSocket(s);
    } catch (err) {
      setBackendStatus('offline');
    }

    return () => {
      if (s) s.disconnect();
    };
  }, []);

  // Compute Total Power Draw in kW dynamically based on active devices
  const totalPowerKw = useMemo(() => {
    let watts = 350; // base standby/infrastructure wattage
    if (devices.ac.isOn) {
      if (devices.ac.mode === 'Eco') watts += 650;
      else if (devices.ac.mode === 'Cool') watts += 1400;
      else watts += 950;
    }
    if (devices.livingLight.isOn) {
      watts += Math.round((devices.livingLight.brightness / 100) * 65);
    }
    if (devices.geyser.isOn) {
      watts += devices.geyser.isPreheating ? 2400 : 2000;
    }
    if (devices.porchLight.isOn) {
      watts += 120;
    }
    // Return formatted to 1 decimal place in kW
    return (watts / 1000).toFixed(1);
  }, [devices]);

  // Compute Active Automation Rules count dynamically
  const activeRulesCount = useMemo(() => {
    return rules.filter((r) => r.enabled).length;
  }, [rules]);

  // Geyser timer tick effect
  useEffect(() => {
    if (!devices.geyser.isOn || devices.geyser.timerMinutes <= 0) return;
    const interval = setInterval(() => {
      setDevices((prev) => {
        if (!prev.geyser.isOn || prev.geyser.timerMinutes <= 1) {
          if (prev.geyser.isOn && prev.geyser.timerMinutes <= 1) {
            addToast({
              type: 'info',
              title: 'Geyser Auto-Timer Complete',
              message: 'Water heater timer finished. Switched to standby mode.',
            });
            addLog({
              type: 'Automated',
              device: 'Smart Geyser',
              icon: 'Flame',
              message: 'Auto-timer cycle elapsed (20 mins). Switched to eco standby.',
              status: 'success',
            });
          }
          return {
            ...prev,
            geyser: { ...prev.geyser, timerMinutes: 0, isOn: false, isPreheating: false },
          };
        }
        return {
          ...prev,
          geyser: { ...prev.geyser, timerMinutes: prev.geyser.timerMinutes - 1 },
        };
      });
    }, 60000); // ticks every minute (or simulated)

    return () => clearInterval(interval);
  }, [devices.geyser.isOn, devices.geyser.timerMinutes, addToast, addLog]);

  // --- Device Controls ---
  const toggleDevice = (deviceId) => {
    setDevices((prev) => {
      const target = prev[deviceId];
      if (!target) return prev;
      const nextState = !target.isOn;

      const updated = {
        ...prev,
        [deviceId]: {
          ...target,
          isOn: nextState,
        },
      };

      addLog({
        type: 'Manual',
        device: target.name,
        icon: deviceId === 'ac' ? 'Thermometer' : deviceId === 'geyser' ? 'Flame' : 'Sun',
        message: `${target.name} turned ${nextState ? 'ON' : 'OFF'} manually.`,
        status: nextState ? 'success' : 'info',
      });

      addToast({
        type: nextState ? 'success' : 'info',
        title: `${target.name}`,
        message: `Switched ${nextState ? 'ON' : 'OFF'} successfully.`,
      });

      return updated;
    });
  };

  const setAcTemperature = (temp) => {
    setDevices((prev) => ({
      ...prev,
      ac: { ...prev.ac, temperature: temp },
    }));
  };

  const setAcMode = (mode) => {
    setDevices((prev) => ({
      ...prev,
      ac: { ...prev.ac, mode },
    }));
    addToast({
      type: 'info',
      title: 'Smart AC Mode Changed',
      message: `Operating mode set to ${mode}.`,
    });
  };

  const setAcFanSpeed = (fanSpeed) => {
    setDevices((prev) => ({
      ...prev,
      ac: { ...prev.ac, fanSpeed },
    }));
  };

  const setLightBrightness = (brightness) => {
    setDevices((prev) => ({
      ...prev,
      livingLight: {
        ...prev.livingLight,
        brightness,
        isOn: brightness > 0 ? true : prev.livingLight.isOn,
      },
    }));
  };

  const setLightColorTemp = (colorTemp) => {
    setDevices((prev) => ({
      ...prev,
      livingLight: { ...prev.livingLight, colorTemp },
    }));
    addToast({
      type: 'info',
      title: 'Light Preset Updated',
      message: `Living Room Luminaire switched to ${colorTemp} tone.`,
    });
  };

  const triggerGeyserPreheat = () => {
    setDevices((prev) => {
      const nextPreheat = !prev.geyser.isPreheating;
      return {
        ...prev,
        geyser: {
          ...prev.geyser,
          isOn: true,
          isPreheating: nextPreheat,
          timerMinutes: nextPreheat ? 30 : prev.geyser.timerMinutes,
          targetWaterTemp: nextPreheat ? 65 : 60,
        },
      };
    });

    const isStarting = !devices.geyser.isPreheating;
    addToast({
      type: 'warning',
      title: isStarting ? '🔥 Quick Preheat Activated' : 'Preheat Cancelled',
      message: isStarting
        ? 'Geyser boost engaged to 65°C for rapid hot water.'
        : 'Standard heating cycle resumed.',
    });

    addLog({
      type: 'Manual',
      device: 'Smart Geyser',
      icon: 'Flame',
      message: isStarting
        ? 'Quick Preheat Boost engaged: Target elevated to 65°C (30 mins)'
        : 'Quick Preheat cancelled. Standard timer active.',
      status: isStarting ? 'warning' : 'info',
    });
  };

  const toggleDoorLock = () => {
    setDevices((prev) => {
      const nextLocked = !prev.doorLock.isLocked;
      const updated = {
        ...prev,
        doorLock: {
          ...prev.doorLock,
          isLocked: nextLocked,
          lastAccessed: `Just now via Dashboard`,
        },
      };

      addToast({
        type: nextLocked ? 'success' : 'warning',
        title: nextLocked ? 'Door Secured' : 'Door Unlocked',
        message: nextLocked ? 'Smart Deadbolt locked successfully.' : 'Smart Deadbolt is now UNLOCKED.',
      });

      addLog({
        type: 'Manual',
        device: 'Smart Door Lock',
        icon: nextLocked ? 'Lock' : 'Unlock',
        message: `Deadbolt toggled to ${nextLocked ? 'LOCKED' : 'UNLOCKED'} state.`,
        status: nextLocked ? 'success' : 'warning',
      });

      return updated;
    });
  };

  const togglePorchLight = () => {
    setDevices((prev) => {
      const nextState = !prev.porchLight.isOn;
      return {
        ...prev,
        porchLight: {
          ...prev.porchLight,
          isOn: nextState,
          motionDetected: nextState ? prev.porchLight.motionDetected : false,
        },
      };
    });
  };

  // --- Automation Rules Controls ---
  const toggleRule = (ruleId) => {
    setRules((prev) =>
      prev.map((rule) => {
        if (rule.id === ruleId) {
          const nextEnabled = !rule.enabled;
          addToast({
            type: nextEnabled ? 'success' : 'info',
            title: rule.name,
            message: nextEnabled ? 'Automation Rule enabled.' : 'Automation Rule disabled.',
          });
          addLog({
            type: 'Manual',
            device: 'Rules Engine',
            icon: 'Sliders',
            message: `Rule "${rule.name}" switched ${nextEnabled ? 'ACTIVE' : 'INACTIVE'}.`,
            status: 'info',
          });
          return { ...rule, enabled: nextEnabled };
        }
        return rule;
      })
    );
  };

  const deleteRule = (ruleId) => {
    const target = rules.find((r) => r.id === ruleId);
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
    if (target) {
      addToast({
        type: 'info',
        title: 'Rule Removed',
        message: `"${target.name}" has been deleted from automation logic.`,
      });
      addLog({
        type: 'Manual',
        device: 'Rules Engine',
        icon: 'Trash2',
        message: `Deleted rule: "${target.name}".`,
        status: 'warning',
      });
    }
  };

  const addRule = (newRule) => {
    const id = 'rule-' + (Date.now());
    const ruleItem = {
      id,
      name: newRule.name || 'Custom Automation Rule',
      trigger: newRule.trigger,
      action: newRule.action,
      timeConstraint: newRule.timeConstraint || 'All Day',
      enabled: true,
      category: newRule.category || 'General',
      triggerCount: 0,
    };
    setRules((prev) => [ruleItem, ...prev]);

    addToast({
      type: 'success',
      title: 'New Rule Created',
      message: `"${ruleItem.name}" is now active in the Rules Engine.`,
    });

    addLog({
      type: 'Manual',
      device: 'Rules Engine',
      icon: 'Plus',
      message: `Created new rule: IF ${ruleItem.trigger} THEN ${ruleItem.action}`,
      status: 'success',
    });
  };

  // --- Hackathon Demo Simulator Actions ---

  // 1. Simulate Heatwave (30°C)
  const simulateHeatwave = () => {
    setIndoorTemp(30);
    setIndoorHumidity(62);
    setClimateStatus('Heatwave Warning (30°C)');

    // Check Rule #1
    const rule1 = rules.find((r) => r.id === 'rule-1');
    const isRule1Active = rule1 ? rule1.enabled : true;

    if (isRule1Active) {
      setDevices((prev) => ({
        ...prev,
        ac: {
          ...prev.ac,
          isOn: true,
          temperature: 24,
          mode: 'Cool',
          fanSpeed: 'High',
        },
      }));

      addToast({
        type: 'warning',
        title: '🌡️ Heatwave Alert (30°C)',
        message: 'Rule #1 Triggered: Smart AC engaged at 24°C High Cool.',
      });

      addLog({
        type: 'Automated',
        device: 'Smart AC',
        icon: 'Thermometer',
        message: 'IF Indoor Temp > 28°C THEN Turn ON Smart AC (Set to 24°C) — Fired successfully.',
        status: 'warning',
      });
    } else {
      addToast({
        type: 'warning',
        title: '🌡️ Heatwave Detected (30°C)',
        message: 'Rule #1 is disabled, so Smart AC was not automated.',
      });

      addLog({
        type: 'Safety Override',
        device: 'Climate Sensor',
        icon: 'Thermometer',
        message: 'Temp exceeded 30°C! Rule #1 is currently paused by user.',
        status: 'warning',
      });
    }
  };

  // 2. Simulate Motion Alert
  const simulateMotionAlert = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAlertBanner({
      id: 'motion-alert-' + Date.now(),
      title: 'SECURITY BREACH DETECTED: Porch Sensor Tripped',
      message: `Zone 4 (Porch & Driveway) detected motion at ${timeNow}. Perimeter floodlight ignited.`,
      severity: 'critical',
      timestamp: timeNow,
    });

    setDevices((prev) => ({
      ...prev,
      porchLight: {
        ...prev.porchLight,
        isOn: true,
        brightness: 100,
        motionDetected: true,
      },
    }));

    addToast({
      type: 'error',
      title: '🚨 Porch Motion Alert!',
      message: 'Perimeter motion detected! Porch floodlight activated.',
    });

    addLog({
      type: 'Safety Override',
      device: 'Porch Floodlight',
      icon: 'Shield',
      message: 'Rule #2 Triggered: Motion Detected in Porch AND Time > 10:00 PM -> Floodlight turned ON.',
      status: 'error',
    });
  };

  // 3. Activate Eco-Mode
  const activateEcoMode = () => {
    setDevices((prev) => ({
      ...prev,
      geyser: {
        ...prev.geyser,
        isOn: false,
        isPreheating: false,
      },
      livingLight: {
        ...prev.livingLight,
        brightness: 20,
        colorTemp: 'Amber',
      },
      ac: {
        ...prev.ac,
        isOn: true,
        mode: 'Eco',
        temperature: 26,
        fanSpeed: 'Low',
      },
      porchLight: {
        ...prev.porchLight,
        isOn: false,
      },
    }));

    setMonthlySavings((prev) => Number((prev + 3.25).toFixed(2)));

    addToast({
      type: 'success',
      title: '🌱 Eco-Mode Activated',
      message: 'Geyser powered down, lighting dimmed to 20%, AC in Eco Mode (26°C). Power draw slashed.',
    });

    addLog({
      type: 'Automated',
      device: 'Energy Manager',
      icon: 'Zap',
      message: 'Eco-Mode Protocol engaged: Non-essential loads shed. Grid draw optimized.',
      status: 'success',
    });
  };

  // Reset Demo to Initial Baseline
  const resetDemo = () => {
    setDevices(INITIAL_DEVICES);
    setIndoorTemp(24);
    setIndoorHumidity(48);
    setClimateStatus('Optimal Comfort');
    setAlertBanner(null);
    setMonthlySavings(48.50);

    addToast({
      type: 'info',
      title: '🔄 Demo Simulator Reset',
      message: 'All devices, sensors, and telemetry restored to default baseline.',
    });

    addLog({
      type: 'Manual',
      device: 'Command Hub',
      icon: 'RefreshCw',
      message: 'Hackathon Demo Simulator reset to clean baseline state.',
      status: 'info',
    });
  };

  const dismissAlertBanner = () => {
    setAlertBanner(null);
  };

  // Authentication Handlers
  const login = (userData) => {
    const fullUser = {
      name: userData?.name || 'Sandesh Rasal',
      email: userData?.email || 'admin@auraautomate.io',
      role: userData?.role || 'Principal Admin',
    };
    setUser(fullUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_auth', 'true');
    localStorage.setItem('aura_user', JSON.stringify(fullUser));

    addToast({
      type: 'success',
      title: 'Authentication Successful',
      message: `Welcome back, ${fullUser.name}! Connected to AuraAutomate Core.`,
    });

    addLog({
      type: 'Manual',
      device: 'Security Gateway',
      icon: 'Shield',
      message: `User ${fullUser.name} (${fullUser.role}) authenticated via Security Gateway.`,
      status: 'success',
    });
  };

  const signup = (userData) => {
    const fullUser = {
      name: userData?.name || 'New Homeowner',
      email: userData?.email || 'user@auraautomate.io',
      role: userData?.role || 'Homeowner / Admin',
      hubCode: userData?.hubCode || 'AURA-HUB-9482',
    };
    setUser(fullUser);
    setIsAuthenticated(true);
    localStorage.setItem('aura_auth', 'true');
    localStorage.setItem('aura_user', JSON.stringify(fullUser));

    addToast({
      type: 'success',
      title: 'Hub Paired & Account Created',
      message: `Welcome to AuraAutomate, ${fullUser.name}! Smart Gateway initialized.`,
    });

    addLog({
      type: 'Automated',
      device: 'Security Gateway',
      icon: 'Shield',
      message: `New account registered for ${fullUser.name}. Paired with Hub ${fullUser.hubCode}.`,
      status: 'success',
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('aura_auth', 'false');

    addToast({
      type: 'info',
      title: 'Session Locked',
      message: 'You have signed out. Gateway credentials cleared.',
    });

    addLog({
      type: 'Manual',
      device: 'Security Gateway',
      icon: 'Lock',
      message: `Session terminated for user ${user?.name || 'Admin'}.`,
      status: 'info',
    });
  };

  const value = {
    theme,
    changeTheme,
    backendStatus,
    user,
    isAuthenticated,
    login,
    signup,
    logout,
    devices,
    indoorTemp,
    indoorHumidity,
    climateStatus,
    rules,
    activityLogs,
    selectedRoom,
    setSelectedRoom,
    activeTab,
    setActiveTab,
    alertBanner,
    dismissAlertBanner,
    toasts,
    addToast,
    removeToast,
    monthlySavings,
    totalPowerKw,
    activeRulesCount,
    // Device Actions
    toggleDevice,
    setAcTemperature,
    setAcMode,
    setAcFanSpeed,
    setLightBrightness,
    setLightColorTemp,
    triggerGeyserPreheat,
    toggleDoorLock,
    togglePorchLight,
    // Rules Actions
    toggleRule,
    deleteRule,
    addRule,
    // Simulator Actions
    simulateHeatwave,
    simulateMotionAlert,
    activateEcoMode,
    resetDemo,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
