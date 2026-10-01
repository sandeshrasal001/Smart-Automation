# ⚡ AuraAutomate — Smart Home Energy & Automation Dashboard

> **Hackathon Theme:** Smart Automation  
> **Project Goal:** An intelligent home dashboard that automates appliance usage, monitors live power consumption, and provides real-time rule triggers to reduce daily energy waste.

---

## 📸 Preview

*(Insert screenshot or GIF of your Antigravity frontend here)*

---

## ✨ Features

- **📊 Live Telemetry & KPI Cards:** Real-time monitoring of total power draw, active automation rules, monthly savings, and indoor climate metrics.
- **⚡ Interactive Device Controls:** Adjust temperature, brightness, timers, and lock states with live status visual indicators.
- **⚙️ Visual Automation Rules Builder:** "If This, Then That" (IFTTT) rule engine that triggers device actions based on environmental factors (temperature, time, motion).
- **📜 Real-Time Activity Feed:** Audit log tracking all automated actions, manual overrides, and security alerts.
- **🧪 Interactive Hackathon Demo Simulator:** Floating control bar that lets judges simulate real-time environmental events (e.g., Heatwave, Motion Alert, Eco-Mode) without physical hardware.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Dev Server Address:** `http://localhost:5173`

### **Backend**
- **Core API:** RESTful API with CORS enabled for `http://localhost:5173`
- **Data Provided:** Device statuses, active automation rules, and activity history

---

## 🔄 API & Data Contract

### **Endpoints**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Fetches initial state (`devices`, `rules`, `history`, `telemetry`). |
| `PATCH` | `/api/devices/:id` | Updates device power state or slider parameters. |
| `PATCH` | `/api/rules/:id` | Toggles an automation rule ON or OFF. |
| `POST` | `/api/rules` | Creates a new user-defined automation rule. |
| `GET` | `/api/history` | Fetches recent activity log feed. |

---

## 🚀 Quick Start Guide

### **Prerequisites**
- Node.js (v18+)
- npm / yarn / pnpm

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/smart-automation-dashboard.git](https://github.com/your-username/smart-automation-dashboard.git)
   cd smart-automation-dashboard
