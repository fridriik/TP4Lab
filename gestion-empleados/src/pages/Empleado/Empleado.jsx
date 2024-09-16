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
            <th>Nro Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>Fecha de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td data-th="Nro Documento">{empleado.nroDocumento}</td>
              <td data-th="Nombre">{empleado.nombre}</td>
              <td data-th="Apellido">{empleado.apellido}</td>
              <td data-th="Email">{empleado.email}</td>
              <td data-th="Fecha de Nacimiento">{empleado.fechaNacimiento}</td>
              <td data-th="Fecha de Ingreso">{empleado.fechaIngreso}</td>
              <td data-th="Acciones">
                <Button onClick={() => navigate(`/empleados/${empleado.id}`)}>
                  Actualizar
                </Button>
                <Button
                  onClick={() => {
                    setEmpleadoIdToDelete(empleado.id);
                    setShowModal(true);
                  }}
                >
                  Eliminar
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
          primaryButtonText="Eliminar"
          secondaryButtonText="Cancelar"
          primaryVariant="danger"
          secondaryVariant="secondary"
        />
      )}
    </div>
  );
};

export default Empleado;
