import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmpleadoById, updateEmpleado } from "../../services/EmpleadoService";
import styles from "./EmpleadoData.module.css";

const EmpleadoData = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const data = await fetchEmpleadoById(id);
        setEmpleado(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmpleado();
  }, [id]);

  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await updateEmpleado(id, empleado);
      alert("Empleado actualizado con éxito");
      navigate("/empleados"); // Regresar a la lista de empleados
    } catch (error) {
      console.error(error);
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
      <h2>Actualizar Empleado</h2>
      <form onSubmit={handleUpdateEmpleado}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" value={empleado.nombre} onChange={handleChange} />

        <label htmlFor="apellido">Apellido:</label>
        <input type="text" name="apellido" value={empleado.apellido} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={empleado.email} onChange={handleChange} />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EmpleadoData;
