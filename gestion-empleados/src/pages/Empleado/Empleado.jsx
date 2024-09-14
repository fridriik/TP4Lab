import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEmpleado,
  fetchEmpleadoById,
  addEmpleado
} from "../../services/EmpleadoService";

const Empleado = () => {
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

    const newId = empleados.length > 0 ? (Math.max(...empleados.map(emp => emp.id)) + 1).toString() : "1";

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
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeNewEmpleado = (e) => {
    const { name, value } = e.target;
    setNewEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Empleados</h1>
        <>
          <form onSubmit={handlePostEmpleado}>
          <label htmlFor="nroDocumento">Número de Documento</label>
            <input
              type="text"
              name="nroDocumento"
              value={newEmpleado.nroDocumento}
              onChange={handleChangeNewEmpleado}
              required
            />
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={newEmpleado.nombre}
              onChange={handleChangeNewEmpleado}
              required
            />
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={newEmpleado.apellido}
              onChange={handleChangeNewEmpleado}
              required
            />
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              name="email"
              value={newEmpleado.email}
              onChange={handleChangeNewEmpleado}
              required
            />
            <label htmlFor="fechaNacimiento">Nacimiento</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={newEmpleado.fechaNacimiento}
              onChange={handleChangeNewEmpleado}
              required
            />
            <label htmlFor="fechaIngreso">Ingreso</label>
            <input
              type="date"
              name="fechaIngreso"
              value={newEmpleado.fechaIngreso}
              onChange={handleChangeNewEmpleado}
              required
            />
            <button type="submit">Agregar Empleado</button>
          </form>
          <ul>
            {empleados.map((empleado) => (
              <li key={empleado.id}>
                {empleado.nombre} {empleado.apellido} - {empleado.email}
                <button onClick={() => navigate(`/empleados/${empleado.id}`)}>
                  Ver empleado
                </button>
              </li>
            ))}
          </ul>
        </>
    </div>
  );
};

export default Empleado;
