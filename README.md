# Gestión de Empleados

Esta es una aplicación de React con Vite para la gestión de empleados. Utiliza json-server para simular una base de datos.

## Configuración del proyecto

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Navega al directorio del proyecto:

   ```
   cd gestion-empleados
   ```
3. Instala las dependencias:

   ```
   npm install
   ```

## Ejecución del proyecto

Para ejecutar el proyecto, necesitas iniciar tanto el servidor de desarrollo de Vite como json-server. Sigue estos pasos:

1. Inicia json-server (simula la base de datos):

   ```
   npm run start
   ```

   Esto iniciará json-server en el puerto 3000.
2. En una nueva terminal, inicia el servidor de desarrollo de Vite:

   ```
   npm run dev
   ```

   Esto iniciará la aplicación React en el puerto que Vite asigne (normalmente 5173).
3. Abre tu navegador y ve a `http://localhost:5173` (o el puerto que Vite te indique en la consola).

## Estructura del proyecto

- `src/`: Contiene el código fuente de la aplicación React.
- `db.json`: Archivo utilizado por json-server como base de datos simulada.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run start`: Inicia json-server.

## Notas adicionales

- Asegúrate de que los puertos 3000 (para json-server) y 5173 (o el que use Vite) estén disponibles en tu sistema.
- Si necesitas modificar la configuración de json-server, puedes hacerlo en el archivo `package.json` bajo el script `"start"`.

## Problemas comunes

Si encuentras algún problema al ejecutar el proyecto, asegúrate de:

1. Tener todas las dependencias instaladas correctamente.
2. No tener conflictos de puertos con otras aplicaciones.
3. Estar usando versiones compatibles de Node.js y npm.

Para cualquier otro problema, por favor, crea un issue en el repositorio de GitHub.
