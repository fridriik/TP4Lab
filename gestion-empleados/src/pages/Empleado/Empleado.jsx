import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { fetchEmpleado, deleteEmpleado } from "../../services/EmpleadoService";
import styles from "./Empleado.module.css";
import Modal from "../../components/Modal/Modal";

const Empleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [empleadoIdToDelete, setEmpleadoIdToDelete] = useState(null);
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

  const handleDeleteEmpleado = async (id) => {
    try {
      await deleteEmpleado(id);
      setEmpleados(empleados.filter((emp) => emp.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error eliminando empleado:", error);
    }
  };

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
            <th className={styles.centered}>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th className={styles.centered}>Email</th>
            <th className={styles.centered}>Nacimiento</th>
            <th className={styles.centered}>Ingreso</th>
            <th className={styles.centered}></th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td className={styles.centered} data-th="Nro Documento">{empleado.nroDocumento}</td>
              <td data-th="Nombre">{empleado.nombre}</td>
              <td data-th="Apellido">{empleado.apellido}</td>
              <td data-th="Email">{empleado.email}</td>
              <td className={styles.centered} data-th="Fecha de Nacimiento">{empleado.fechaNacimiento}</td>
              <td className={styles.centered} data-th="Fecha de Ingreso">{empleado.fechaIngreso}</td>
              <td className={styles.acciones} data-th="">
                <Button onClick={() => navigate(`/empleados/${empleado.id}`)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24px"
                    height="24px"
                    className={styles.iconUpdate}
                  >
                    <path d="M3 17.25V21h3.75l11.95-11.95-3.75-3.75L3 17.25zM20.71 7.29a1.003 1.003 0 0 0 0-1.42l-2.29-2.29a1.003 1.003 0 0 0-1.42 0l-1.29 1.29 3.75 3.75 1.29-1.29z" />
                  </svg>
                </Button>
                <Button
                  onClick={() => {
                    setEmpleadoIdToDelete(empleado.id);
                    setShowModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24px"
                    height="24px"
                    className={styles.iconDelete}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 L6 18 M6 6 L18 18" />
                  </svg>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Eliminar empleado"
          content="¿Estás seguro de que deseas eliminar este empleado?"
          onPrimaryAction={() => handleDeleteEmpleado(empleadoIdToDelete)}
          primaryButtonText="Eliminar empleado"
          secondaryButtonText="Cancelar"
          primaryVariant="danger"
          secondaryVariant="secondary"
        />
      )}
    </div>
  );
};

export default Empleado;
