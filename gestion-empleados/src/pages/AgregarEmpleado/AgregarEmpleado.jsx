import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmpleado,
  fetchEmpleado,
  fetchEmpleadoById,
} from "../../services/EmpleadoService";
import styles from "./AgregarEmpleado.module.css";
import Input from "./../../components/Input/Input";
import Button from "../../components/Button/Button";

const AgregarEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [newEmpleado, setNewEmpleado] = useState({
    nroDocumento: "",
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    fechaIngreso: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getEmpleado = async () => {
      try {
        const data = await fetchEmpleado();
        setEmpleados(data);
      } catch (error) {
        console.error(error);
      }
    };

    getEmpleado();
  }, []);

  useEffect(() => {
    if (id) {
      const getEmpleadoById = async () => {
        try {
          await fetchEmpleadoById(id);
        } catch (error) {
          console.error(error);
        }
      };

      getEmpleadoById();
    }
  }, [id]);

  const handlePostEmpleado = async (e) => {
    e.preventDefault();

    if (!/^\d{7,8}$/.test(newEmpleado.nroDocumento)) {
      alert("El número de documento debe tener entre 7 y 8 dígitos.");
      return;
    }

    const newId =
      empleados.length > 0
        ? (
            Math.max(...empleados.map((emp) => parseInt(emp.id, 10))) + 1
          ).toString()
        : "1";

    try {
      const empleadoCreado = await addEmpleado({ ...newEmpleado, id: newId });
      setEmpleados([...empleados, empleadoCreado]);

      setNewEmpleado({
        nroDocumento: "",
        nombre: "",
        apellido: "",
        email: "",
        fechaNacimiento: "",
        fechaIngreso: "",
      });

      navigate("/empleados");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeNewEmpleado = (e) => {
    const { name, value } = e.target;
    setNewEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.agregarEmpleado}>
      <h1 className={styles.empleado}>Agregar Empleado</h1>
      <div className={styles.containerFormEmpleado}>
        <form className={styles.formEmpleado} onSubmit={handlePostEmpleado}>
          <Input
            type="text"
            name="nroDocumento"
            placeholder="Documento"
            value={newEmpleado.nroDocumento}
            onChange={handleChangeNewEmpleado}
            required
          />
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newEmpleado.nombre}
            onChange={handleChangeNewEmpleado}
            required
          />
          <Input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={newEmpleado.apellido}
            onChange={handleChangeNewEmpleado}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmpleado.email}
            onChange={handleChangeNewEmpleado}
            required
          />
          <Input
            type="date"
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"
            value={newEmpleado.fechaNacimiento || ""}
            onChange={handleChangeNewEmpleado}
            required
          />
          <Input
            type="date"
            name="fechaIngreso"
            placeholder="Fecha de ingreso"
            value={newEmpleado.fechaIngreso || ""}
            onChange={handleChangeNewEmpleado}
            required
          />
        </form>
        <Button type="submit">Agregar Empleado</Button>
      </div>
    </div>
  );
};

export default AgregarEmpleado;
