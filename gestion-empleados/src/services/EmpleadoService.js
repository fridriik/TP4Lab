const API_URL = 'http://localhost:3000/empleados';

// Obtener todos los empleados
export const fetchEmpleado = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener empleados');
  return response.json();
};

// Obtener un empleado por ID
export const fetchEmpleadoById = async (id) => {
  const response = await fetch(`${API_URL}?id=${Number(id)}`);
  if (!response.ok) throw new Error('Error al obtener el empleado');
  const data = await response.json();
  return data[0];
};

// Crear un nuevo empleado
export const addEmpleado = async (employee) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error('Error al crear el empleado');
  return response.json();
};

// Actualizar un empleado existente
export const updateEmpleado = async (id, updatedEmployee) => {
  const response = await fetch(`${API_URL}/${Number(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedEmployee),
  });
  if (!response.ok) throw new Error('Error al actualizar el empleado');
  return response.json();
};

// Eliminar un empleado
export const deleteEmpleado = async (id) => {
  const response = await fetch(`${API_URL}/${Number(id)}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el empleado');
};
