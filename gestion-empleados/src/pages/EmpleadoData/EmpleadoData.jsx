import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
} from "../../services/EmpleadoService";
import styles from "./EmpleadoData.module.css";

const EmpleadoData = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [isEditando, setIsEditando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const data = await fetchEmpleadoById(id);
        if (data) {
          setEmpleado(data);
        } else {
          console.error("Empleado no encontrado");
        }
      } catch (error) {
        console.error("Error buscando empleado:", error);
      }
    };

    getEmpleado();
  }, [id]);

  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await updateEmpleado(id, empleado);
      alert("Empleado actualizado con éxito");
      setIsEditando(false);
    } catch (error) {
      console.error("Error actualizando empleado:", error);
    }
  };

  const handleDeleteEmpleado = async () => {
    try {
      await deleteEmpleado(id);
      alert("Empleado eliminado con éxito");
      navigate("/empleados"); 
    } catch (error) {
      console.error("Error eliminando empleado:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  if (!empleado) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.empleadodata}>
      <h2>Detalles del Empleado</h2>
      {isEditando ? (
        <form onSubmit={handleUpdateEmpleado}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
          />

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={empleado.apellido}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={empleado.email}
            onChange={handleChange}
          />

          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setIsEditando(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <div>
          <p>Nombre: {empleado.nombre}</p>
          <p>Apellido: {empleado.apellido}</p>
          <p>Email: {empleado.email}</p>
          <p>Fecha de Nacimiento: {empleado.fechaNacimiento}</p>
          <p>Fecha de Ingreso: {empleado.fechaIngreso}</p>

          <button onClick={() => setIsEditando(true)}>Editar</button>
          <button onClick={handleDeleteEmpleado}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default EmpleadoData;
