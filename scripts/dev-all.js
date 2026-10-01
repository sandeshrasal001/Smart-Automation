import { spawn } from 'child_process';

console.log('🚀 Starting AuraAutomate Full-Stack Suite (Frontend + Backend)...\n');

const isWindows = process.platform === 'win32';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

// 1. Start Backend Server (Express + Socket.IO on port 5000)
const backend = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
});

// 2. Start Frontend Dev Server (Vite on port 3000)
const frontend = spawn(npxCmd, ['vite', '--port', '3000', '--host'], {
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\n🛑 Shutting down AuraAutomate servers...');
  backend.kill();
  frontend.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
