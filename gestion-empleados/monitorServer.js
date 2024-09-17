import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../db.json');
const originalDbPath = path.resolve(__dirname, '../db_backup.json');

function restaurarEmpleados() {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  if (!dbData.empleados || dbData.empleados.length === 0) {
    console.log('No hay empleados. Restaurando...');

    const originalData = JSON.parse(fs.readFileSync(originalDbPath, 'utf8'));
    dbData.empleados = originalData.empleados;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
    console.log('Empleados restaurados correctamente.');
  }
}

setInterval(restaurarEmpleados, 10000);
