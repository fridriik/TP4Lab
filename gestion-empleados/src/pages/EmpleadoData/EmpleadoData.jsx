import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEmpleadoById,
  updateEmpleado,
  deleteEmpleado,
} from "../../services/EmpleadoService";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./EmpleadoData.module.css";

const EmpleadoData = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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

  const handleDeleteEmpleado = async () => {
    try {
      await deleteEmpleado(id);
      setShowDeleteModal(false);
      alert("Empleado eliminado con éxito");
      navigate("/empleados");
    } catch (error) {
      console.error("Error eliminando empleado:", error);
    }
  };

  const handleUpdateEmpleado = async () => {
    try {
      await updateEmpleado(id, empleado);
      setShowUpdateModal(false);
      alert("Empleado actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error actualizando empleado:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };

  if (!empleado) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.empleadoData}>
      <h1 className={styles.title}>Detalles del Empleado</h1>

      {!isEditing ? (
        <div className={styles.empleadoDataFormContainer}>
          <div className={styles.empleadoDataForm}>
            <Input
              type="text"
              name="nroDocumento"
              value={empleado.nroDocumento}
              onChange={handleChange}
              placeholder="Documento"
              disabled
            />
            <Input
              type="text"
              name="nombre"
              value={empleado.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              disabled
            />
            <Input
              type="text"
              name="apellido"
              value={empleado.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              disabled
            />
            <Input
              type="email"
              name="email"
              value={empleado.email}
              onChange={handleChange}
              placeholder="Email"
              disabled
            />
            <Input
              type="date"
              name="fechaNacimiento"
              value={empleado.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha de Nacimiento"
              disabled
            />
            <Input
              type="date"
              name="fechaIngreso"
              value={empleado.fechaIngreso}
              onChange={handleChange}
              placeholder="Fecha de Ingreso"
              disabled
            />
            <Button variant="primary" onClick={() => setIsEditing(true)}>Actualizar</Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Eliminar
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.empleadoDataFormContainer}>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.empleadoDataForm}>
              <Input
                type="text"
                name="nroDocumento"
                value={empleado.nroDocumento}
                onChange={handleChange}
                placeholder="Documento"
              />
              <Input
                type="text"
                name="nombre"
                value={empleado.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
              <Input
                type="text"
                name="apellido"
                value={empleado.apellido}
                onChange={handleChange}
                placeholder="Apellido"
              />
              <Input
                type="email"
                name="email"
                value={empleado.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <Input
                type="date"
                name="fechaNacimiento"
                value={empleado.fechaNacimiento}
                onChange={handleChange}
                placeholder="Fecha de Nacimiento"
              />
              <Input
                type="date"
                name="fechaIngreso"
                value={empleado.fechaIngreso}
                onChange={handleChange}
                placeholder="Fecha de Ingreso"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="success">
                Actualizar
              </Button>
            </div>
          </form>
        </div>
      )}

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Eliminar Empleado"
          content="¿Estás seguro de que deseas eliminar este empleado?"
          onPrimaryAction={handleDeleteEmpleado}
          primaryButtonText="Eliminar"
          secondaryButtonText="Cancelar"
          primaryVariant="danger"
          secondaryVariant="default"
        />
      )}

      {showUpdateModal && (
        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title="Confirmar Actualización"
          content="¿Deseas guardar los cambios realizados?"
          onPrimaryAction={handleUpdateEmpleado}
          primaryButtonText="Guardar Cambios"
          secondaryButtonText="Cancelar"
          primaryVariant="success"
          secondaryVariant="secondary"
        />
      )}
    </div>
  );
};

export default EmpleadoData;
