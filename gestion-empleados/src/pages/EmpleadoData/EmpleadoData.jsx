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
import useForm from "../../hooks/useForm";
import styles from "./EmpleadoData.module.css";

const EmpleadoData = () => {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const initialValues = {
    nroDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    fechaIngreso: "",
  };

  const { values, errors, handleChange, handleSubmit, reset } = useForm(
    initialValues,
    "empleado",
    empleado
  );

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const data = await fetchEmpleadoById(id);
        setEmpleado(data);
        reset();
        Object.keys(data).forEach((key) => {
          handleChange({ target: { name: key, value: data[key] } });
        });
      } catch (error) {
        console.error("Error fetching empleado:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      getEmpleado();
    }
  }, [id, loading, handleChange, reset]);

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
      await updateEmpleado(id, values);
      setShowUpdateModal(false);
      alert("Empleado actualizado con éxito");
      setIsEditing(false);
    } catch (error) {
      console.error("Error actualizando empleado:", error);
    }
  };

  const onSubmit = () => {
    if (Object.keys(errors).length === 0) {
      setShowUpdateModal(true);
    }
  };

  const handleCancelEdit = (e) => {
    e.preventDefault(); 
    window.location.reload();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.empleadoData}>
      <h1 className={styles.title}>Detalles del Empleado</h1>

      <div className={styles.empleadoDataFormContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.empleadoDataForm}>
            <Input
              type="text"
              name="nroDocumento"
              value={values.nroDocumento}
              onChange={handleChange}
              placeholder="Documento"
              disabled={!isEditing}
              validate={() => errors.nroDocumento}
              errorMessage={errors.nroDocumento}
            />
            <Input
              type="text"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              disabled={!isEditing}
              validate={() => errors.nombre}
              errorMessage={errors.nombre}
            />
            <Input
              type="text"
              name="apellido"
              value={values.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              disabled={!isEditing}
              validate={() => errors.apellido}
              errorMessage={errors.apellido}
            />
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              disabled={!isEditing}
              validate={() => errors.email}
              errorMessage={errors.email}
            />
            <Input
              type="date"
              name="fechaNacimiento"
              value={values.fechaNacimiento}
              onChange={handleChange}
              placeholder="Fecha de Nacimiento"
              disabled={!isEditing}
              validate={() => errors.fechaNacimiento}
              errorMessage={errors.fechaNacimiento}
            />
            <Input
              type="date"
              name="fechaIngreso"
              value={values.fechaIngreso}
              onChange={handleChange}
              placeholder="Fecha de Ingreso"
              disabled={!isEditing}
              validate={() => errors.fechaIngreso}
              errorMessage={errors.fechaIngreso}
            />
            {!isEditing ? (
              <>
                <Button type="button" variant="primary" onClick={() => setIsEditing(true)}>Actualizar</Button>
                <Button type="button" variant="danger" onClick={() => setShowDeleteModal(true)}>Eliminar</Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancelEdit} 
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="success">Actualizar</Button>
              </>
            )}
          </div>
        </form>
      </div>

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
