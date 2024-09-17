import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { fetchEmpleado } from "../../services/EmpleadoService";
import styles from "./Empleado.module.css";

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEmpleados = async () => {
      try {
        const data = await fetchEmpleado();
        setEmpleados(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmpleados();
  }, []);

  return (
    <div className={styles.empleado}>
      <div className={styles.title}>
        <h1>Empleados</h1>
        <Button onClick={() => navigate("/empleados/agregar")}>
          Agregar Empleado
        </Button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.centered}>Nombre</th>
            <th className={styles.centered}>Apellido</th>
            <th className={styles.centered}>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td className={styles.centered} data-th="Nombre">{empleado.nombre}</td>
              <td className={styles.centered} data-th="Apellido">{empleado.apellido}</td>
              <td className={styles.centered} data-th="Email">{empleado.email}</td>
              <td className={styles.centered}>
                <Button onClick={() => navigate(`/empleados/${empleado.id}`)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleado;
