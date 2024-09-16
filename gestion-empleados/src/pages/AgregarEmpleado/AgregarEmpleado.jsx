import { useNavigate } from "react-router-dom";
import { addEmpleado } from "../../services/EmpleadoService";
import styles from "./AgregarEmpleado.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useForm";

const AgregarEmpleado = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit, reset, lastId } = useForm({
    nroDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    fechaIngreso: "",
  });

  const onSubmit = async () => {
    try {
      const newId = (lastId + 1).toString();
      const empleadoData = { ...values, id: newId };
      await addEmpleado(empleadoData);
    
      reset();
      navigate("/empleados");
    } catch (error) {
      console.error("Error agregando empleado", error);
    }
  };

  return (
    <div className={styles.agregarEmpleado}>
      <h1 className={styles.empleado}>Agregar Empleado</h1>
      <div className={styles.containerFormEmpleado}>
        <form className={styles.formEmpleado} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            name="nroDocumento"
            placeholder="Documento"
            value={values.nroDocumento}
            onChange={handleChange}
            validate={() => errors.nroDocumento}
            errorMessage={errors.nroDocumento}
            required
          />
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={values.nombre}
            onChange={handleChange}
            validate={() => errors.nombre}
            errorMessage={errors.nombre}
            required
          />
          <Input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={values.apellido}
            onChange={handleChange}
            validate={() => errors.apellido}
            errorMessage={errors.apellido}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            validate={() => errors.email}
            errorMessage={errors.email}
            required
          />
          <Input
            type="date"
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"
            value={values.fechaNacimiento || ''}
            onChange={handleChange}
            validate={() => errors.fechaNacimiento}
            errorMessage={errors.fechaNacimiento}
            required
          />
          <Input
            type="date"
            name="fechaIngreso"
            placeholder="Fecha de ingreso"
            value={values.fechaIngreso || ''}
            onChange={handleChange}
            validate={() => errors.fechaIngreso}
            errorMessage={errors.fechaIngreso}
            required
          />
        </form>
        <Button type="submit">Agregar Empleado</Button>
      </div>
    </div>
  );
};

export default AgregarEmpleado;
