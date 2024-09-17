import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const monitorScript = path.resolve(__dirname, 'monitorServer.js');
const jsonServerCommand = 'json-server';
const jsonServerArgs = ['--watch', '../db.json', '--port', '3000'];

const monitorProcess = spawn('node', [monitorScript], {
  stdio: 'inherit',
  shell: true
});

const jsonServerProcess = spawn(jsonServerCommand, jsonServerArgs, {
  stdio: 'inherit',
  shell: true
});

// Manejar eventos de salida
monitorProcess.on('exit', (code) => {
  console.log(`Monitor script exited with code ${code}`);
  jsonServerProcess.kill();
});

jsonServerProcess.on('exit', (code) => {
  console.log(`JSON Server exited with code ${code}`);
  monitorProcess.kill();
});
