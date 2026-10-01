const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:5000/api';

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Get full state
  async getState() {
    try {
      const res = await fetch(`${API_BASE}/state`);
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Toggle device
  async toggleDevice(id) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}/toggle`, { method: 'POST' });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Update device state
  async updateDevice(id, data) {
    try {
      const res = await fetch(`${API_BASE}/devices/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Rules
  async addRule(rule) {
    try {
      const res = await fetch(`${API_BASE}/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  async toggleRule(id) {
    try {
      const res = await fetch(`${API_BASE}/rules/${id}/toggle`, { method: 'PATCH' });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  async deleteRule(id) {
    try {
      const res = await fetch(`${API_BASE}/rules/${id}`, { method: 'DELETE' });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Simulator
  async simulate(type) {
    try {
      const res = await fetch(`${API_BASE}/simulate/${type}`, { method: 'POST' });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  // Auth
  async login(credentials) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },

  async signup(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok ? await res.json() : null;
    } catch {
      return null;
    }
  },
};
