import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// Enable CORS for Vite frontend
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// In-Memory IoT State Store
let state = {
  devices: {
    ac: {
      id: 'ac',
      name: 'Smart Dual-Inverter AC',
      room: 'Living Room',
      isOn: true,
      temperature: 24,
      mode: 'Cool',
      fanSpeed: 'Med',
      powerWatts: 1400,
    },
    livingLight: {
      id: 'livingLight',
      name: 'Living Room Luminaire',
      room: 'Living Room',
      isOn: true,
      brightness: 85,
      colorTemp: 'Daylight',
      powerWatts: 65,
    },
    geyser: {
      id: 'geyser',
      name: 'Smart Hybrid Geyser',
      room: 'Garage',
      isOn: true,
      timerMinutes: 20,
      isPreheating: false,
      currentWaterTemp: 52,
      targetWaterTemp: 60,
      powerWatts: 2000,
    },
    doorLock: {
      id: 'doorLock',
      name: 'Smart Biometric Deadbolt',
      room: 'Garage',
      isLocked: true,
      batteryPercent: 94,
      lastAccessed: '11:42 AM by Admin',
      autoRelock: true,
    },
    porchLight: {
      id: 'porchLight',
      name: 'Porch Floodlight & Sensor',
      room: 'Garage',
      isOn: false,
      brightness: 100,
      motionDetected: false,
      powerWatts: 120,
    },
  },
  indoorTemp: 24,
  indoorHumidity: 48,
  climateStatus: 'Optimal Comfort',
  rules: [
    {
      id: 'rule-1',
      name: 'Climate Thermal Protection',
      trigger: 'Indoor Temp > 28°C',
      action: 'Turn ON Smart AC (Set to 24°C)',
      timeConstraint: 'All Day',
      enabled: true,
      category: 'Climate',
      triggerCount: 14,
    },
    {
      id: 'rule-2',
      name: 'Night Perimeter Security',
      trigger: 'Motion Detected in Porch AND Time > 10:00 PM',
      action: 'Turn ON Porch Floodlight',
      timeConstraint: '10:00 PM - 06:00 AM',
      enabled: true,
      category: 'Security',
      triggerCount: 7,
    },
    {
      id: 'rule-3',
      name: 'Green Solar EV Dispatch',
      trigger: 'Solar Storage > 80%',
      action: 'Start EV Charger (Eco Mode)',
      timeConstraint: 'Peak Solar (11:00 AM - 04:00 PM)',
      enabled: false,
      category: 'Energy',
      triggerCount: 23,
    },
  ],
  activityLogs: [
    {
      id: 'log-1',
      timestamp: '12:01:24 PM',
      relativeTime: 'Just now',
      type: 'Automated',
      device: 'Smart AC',
      icon: 'Thermometer',
      message: 'Indoor climate optimized: Target holding steady at 24°C',
      status: 'success',
    },
    {
      id: 'log-2',
      timestamp: '11:58:10 AM',
      relativeTime: '3m ago',
      type: 'Manual',
      device: 'Living Room Lighting',
      icon: 'Sun',
      message: 'User adjusted brightness to 85% (Daylight 4000K)',
      status: 'info',
    },
  ],
  monthlySavings: 48.5,
  alertBanner: null,
};

// Helper: Calculate Power in kW
function calculateTotalPowerKw() {
  let watts = 350;
  if (state.devices.ac.isOn) {
    watts += state.devices.ac.mode === 'Eco' ? 650 : 1400;
  }
  if (state.devices.livingLight.isOn) {
    watts += Math.round((state.devices.livingLight.brightness / 100) * 65);
  }
  if (state.devices.geyser.isOn) {
    watts += state.devices.geyser.isPreheating ? 2400 : 2000;
  }
  if (state.devices.porchLight.isOn) {
    watts += 120;
  }
  return (watts / 1000).toFixed(1);
}

// Add Log Helper
function addLog(log) {
  const newLog = {
    id: 'log-' + Date.now(),
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    relativeTime: 'Just now',
    status: 'info',
    ...log,
  };
  state.activityLogs.unshift(newLog);
  state.activityLogs = state.activityLogs.slice(0, 50); // limit to 50
  io.emit('log:new', newLog);
  return newLog;
}

// --- REST API ENDPOINTS ---

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    gateway: 'AuraAutomate IoT Hub Core v2.4',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    activeSockets: io.engine.clientsCount,
    mqttProtocol: 'v5.0 Connected',
    meshNodes: 18,
  });
});

// Full Dashboard State
app.get('/api/state', (req, res) => {
  res.json({
    ...state,
    totalPowerKw: calculateTotalPowerKw(),
  });
});

// Devices Endpoints
app.get('/api/devices', (req, res) => {
  res.json(state.devices);
});

app.post('/api/devices/:id/toggle', (req, res) => {
  const { id } = req.params;
  const device = state.devices[id];
  if (!device) return res.status(404).json({ error: 'Device not found' });

  if (id === 'doorLock') {
    device.isLocked = !device.isLocked;
    device.lastAccessed = `Just now via API`;
  } else {
    device.isOn = !device.isOn;
  }

  addLog({
    type: 'Manual',
    device: device.name,
    icon: id === 'ac' ? 'Thermometer' : id === 'geyser' ? 'Flame' : 'Sun',
    message: `${device.name} toggled via REST API to ${device.isOn || device.isLocked ? 'ACTIVE' : 'OFF'}.`,
  });

  io.emit('device:updated', { id, device, totalPowerKw: calculateTotalPowerKw() });
  res.json({ success: true, device, totalPowerKw: calculateTotalPowerKw() });
});

app.post('/api/devices/:id/update', (req, res) => {
  const { id } = req.params;
  const device = state.devices[id];
  if (!device) return res.status(404).json({ error: 'Device not found' });

  Object.assign(device, req.body);

  io.emit('device:updated', { id, device, totalPowerKw: calculateTotalPowerKw() });
  res.json({ success: true, device, totalPowerKw: calculateTotalPowerKw() });
});

// Rules Endpoints
app.get('/api/rules', (req, res) => {
  res.json(state.rules);
});

app.post('/api/rules', (req, res) => {
  const { name, trigger, action, timeConstraint, category } = req.body;
  if (!trigger || !action) {
    return res.status(400).json({ error: 'Trigger and action required' });
  }

  const newRule = {
    id: 'rule-' + Date.now(),
    name: name || `IF ${trigger} THEN ${action}`,
    trigger,
    action,
    timeConstraint: timeConstraint || 'All Day',
    enabled: true,
    category: category || 'General',
    triggerCount: 0,
  };

  state.rules.unshift(newRule);
  addLog({
    type: 'Manual',
    device: 'Rules Engine',
    icon: 'Plus',
    message: `New rule created via API: IF ${trigger} THEN ${action}`,
  });

  io.emit('rule:added', newRule);
  res.status(201).json({ success: true, rule: newRule });
});

app.patch('/api/rules/:id/toggle', (req, res) => {
  const { id } = req.params;
  const rule = state.rules.find((r) => r.id === id);
  if (!rule) return res.status(404).json({ error: 'Rule not found' });

  rule.enabled = !rule.enabled;
  io.emit('rule:updated', rule);
  res.json({ success: true, rule });
});

app.delete('/api/rules/:id', (req, res) => {
  const { id } = req.params;
  state.rules = state.rules.filter((r) => r.id !== id);
  io.emit('rule:deleted', { id });
  res.json({ success: true, id });
});

// Logs Endpoints
app.get('/api/logs', (req, res) => {
  res.json(state.activityLogs);
});

// Simulator Endpoints
app.post('/api/simulate/:type', (req, res) => {
  const { type } = req.params;

  if (type === 'heatwave') {
    state.indoorTemp = 30;
    state.indoorHumidity = 62;
    state.climateStatus = 'Heatwave Warning (30°C)';
    state.devices.ac.isOn = true;
    state.devices.ac.temperature = 24;
    state.devices.ac.mode = 'Cool';
    state.devices.ac.fanSpeed = 'High';

    addLog({
      type: 'Automated',
      device: 'Smart AC',
      icon: 'Thermometer',
      message: 'Simulation: Temp reached 30°C -> Rule #1 fired: Smart AC turned ON at 24°C.',
      status: 'warning',
    });
  } else if (type === 'motion') {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    state.alertBanner = {
      id: 'motion-alert-' + Date.now(),
      title: 'SECURITY BREACH DETECTED: Porch Sensor Tripped',
      message: `Zone 4 detected motion at ${timeNow}. Perimeter floodlight ignited.`,
      severity: 'critical',
      timestamp: timeNow,
    };
    state.devices.porchLight.isOn = true;
    state.devices.porchLight.motionDetected = true;

    addLog({
      type: 'Safety Override',
      device: 'Porch Floodlight',
      icon: 'Shield',
      message: 'Simulation: Motion detected in Porch -> Floodlight turned ON.',
      status: 'error',
    });
  } else if (type === 'eco') {
    state.devices.geyser.isOn = false;
    state.devices.geyser.isPreheating = false;
    state.devices.livingLight.brightness = 20;
    state.devices.livingLight.colorTemp = 'Amber';
    state.devices.ac.isOn = true;
    state.devices.ac.mode = 'Eco';
    state.devices.ac.temperature = 26;
    state.devices.porchLight.isOn = false;
    state.monthlySavings = Number((state.monthlySavings + 3.25).toFixed(2));

    addLog({
      type: 'Automated',
      device: 'Energy Manager',
      icon: 'Zap',
      message: 'Simulation: Eco-Mode Protocol engaged. High-wattage loads shed.',
      status: 'success',
    });
  } else if (type === 'reset') {
    state.indoorTemp = 24;
    state.indoorHumidity = 48;
    state.climateStatus = 'Optimal Comfort';
    state.alertBanner = null;
    state.monthlySavings = 48.5;
    state.devices.ac.isOn = true;
    state.devices.ac.temperature = 24;
    state.devices.ac.mode = 'Cool';
    state.devices.geyser.isOn = true;
    state.devices.geyser.isPreheating = false;
    state.devices.porchLight.isOn = false;
  }

  const updatedState = { ...state, totalPowerKw: calculateTotalPowerKw() };
  io.emit('state:synced', updatedState);
  res.json({ success: true, state: updatedState });
});

// Authentication Endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = {
    name: 'Sandesh Rasal',
    email,
    role: 'Principal Admin',
    token: 'jwt_mock_token_' + Date.now(),
  };

  addLog({
    type: 'Manual',
    device: 'Security Gateway',
    icon: 'Shield',
    message: `User ${user.name} logged in via REST API.`,
  });

  res.json({ success: true, user });
});

app.post('/api/auth/signup', (req, res) => {
  const { name, email, role, hubCode } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const user = {
    name,
    email,
    role: role || 'Homeowner',
    hubCode: hubCode || 'AURA-HUB-9482',
    token: 'jwt_mock_token_' + Date.now(),
  };

  addLog({
    type: 'Automated',
    device: 'Security Gateway',
    icon: 'Shield',
    message: `New user ${name} registered and paired with Hub ${user.hubCode}.`,
  });

  res.json({ success: true, user });
});

// --- Socket.IO Real-Time Gateway ---
io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  // Send current state on connection
  socket.emit('state:init', {
    ...state,
    totalPowerKw: calculateTotalPowerKw(),
  });

  // Handle client socket commands
  socket.on('device:toggle', (deviceId) => {
    const device = state.devices[deviceId];
    if (device) {
      if (deviceId === 'doorLock') device.isLocked = !device.isLocked;
      else device.isOn = !device.isOn;
      io.emit('device:updated', { id: deviceId, device, totalPowerKw: calculateTotalPowerKw() });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`⚡ AuraAutomate Backend Server running at http://localhost:${PORT}`);
  console.log(`📡 WebSocket Gateway online on port ${PORT}`);
});
