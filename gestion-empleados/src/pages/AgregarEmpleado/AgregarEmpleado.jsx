import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEmpleado, fetchEmpleado, fetchEmpleadoById } from "../../services/EmpleadoService"; 
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
        ? (Math.max(...empleados.map((emp) => parseInt(emp.id, 10))) + 1).toString()
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
    <div>
      <h1>Agregar Empleado</h1>
      <form onSubmit={handlePostEmpleado}>
        <label htmlFor="nroDocumento">Número de Documento</label>
        <Input
          type="text"
          name="nroDocumento"
          value={newEmpleado.nroDocumento}
          onChange={handleChangeNewEmpleado}
          required
        />
        <label htmlFor="nombre">Nombre</label>
        <Input
          type="text"
          name="nombre"
          value={newEmpleado.nombre}
          onChange={handleChangeNewEmpleado}
          required
        />
        <label htmlFor="apellido">Apellido</label>
        <Input
          type="text"
          name="apellido"
          value={newEmpleado.apellido}
          onChange={handleChangeNewEmpleado}
          required
        />
        <label htmlFor="email">E-Mail</label>
        <Input
          type="email"
          name="email"
          value={newEmpleado.email}
          onChange={handleChangeNewEmpleado}
          required
        />
        <label htmlFor="fechaNacimiento">Nacimiento</label>
        <Input
          type="date"
          name="fechaNacimiento"
          value={newEmpleado.fechaNacimiento}
          onChange={handleChangeNewEmpleado}
          required
        />
        <label htmlFor="fechaIngreso">Ingreso</label>
        <Input
          type="date"
          name="fechaIngreso"
          value={newEmpleado.fechaIngreso}
          onChange={handleChangeNewEmpleado}
          required
        />
        <Button type="submit">Agregar Empleado</Button>
      </form>
    </div>
  );
};

export default AgregarEmpleado;