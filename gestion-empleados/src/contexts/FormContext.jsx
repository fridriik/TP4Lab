import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { fetchEmpleado } from '../services/EmpleadoService';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchAndSetEmpleados = async () => {
      try {
        const empleadosData = await fetchEmpleado();
        setEmpleados(empleadosData);
      } catch (error) {
        console.error('Error cargando empleados:', error);
      }
    };

    fetchAndSetEmpleados();
  }, []);

  const validateEmailEmpleado = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) return 'El email es requerido.';
    if (!emailRegex.test(email)) return 'Email inválido.';
  
    const emailExists = empleados.some((empleado) => empleado.email === email);
    if (emailExists) return 'Ya existe un empleado con el email ingresado.';
  
    return null;
  };
  
  const validateEmailLogin = (emailLogin) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailLogin) return 'El email es requerido.';
    if (!emailRegex.test(emailLogin)) return 'Email inválido.';  
    return null;
  };
  

  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida.';
    return null;
  };

  const validateName = (name) => {
    if (!name) return 'El nombre es requerido.';
    const symbolsRegex = /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/;
    if (symbolsRegex.test(name)) return 'El nombre no puede contener números o símbolos especiales.';
    if (name.length < 2 || name.length > 30) return 'El nombre debe tener entre 2 y 30 caracteres.';
    return null;
  };

  const validateSurname = (surname) => {
    if (!surname) return 'El apellido es requerido.';
    const symbolsRegex = /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/;
    if (symbolsRegex.test(surname)) return 'El apellido no puede contener números o símbolos especiales.';
    if (surname.length < 2 || surname.length > 30) return 'El apellido debe tener entre 2 y 30 caracteres.';
    return null;
  };

  const validateDocument = (nroDocumento) => {
    const docRegex = /^[0-9]{7,8}$/;
    if (!nroDocumento) return 'El documento es requerido.';
    if (!docRegex.test(nroDocumento)) return 'El documento debe tener entre 7 y 8 dígitos, sin letras ni símbolos.';

    const documentExists = empleados.some((empleado) => empleado.nroDocumento === nroDocumento);
    if (documentExists) return 'Ya existe un empleado con el documento ingresado.';
    return null;
  };

  const validateBirthDate = (birthDate) => {
    if (!birthDate) return 'La fecha de nacimiento es requerida.';
    const today = new Date();
    const birthDateObj = new Date(birthDate);

    if (isNaN(birthDateObj.getTime())) return 'Fecha de nacimiento inválida.';

    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return 'La edad del empleado no puede ser menor a 18 años.';
    }

    if (birthDateObj > today) return 'La fecha de nacimiento no puede ser posterior al día de la fecha.';

    return null;
  };

  const validateEntryDate = (entryDate) => {
    if (!entryDate) return 'La fecha de ingreso es requerida.';
    const today = new Date();
    const entryDateObj = new Date(entryDate);

    if (isNaN(entryDateObj.getTime())) return 'Fecha de ingreso inválida.';

    if (entryDateObj > today) return 'La fecha de ingreso no puede ser posterior al día de la fecha.';

    return null;
  };

  const value = {
    empleados,
    validateEmailLogin,
    validatePassword,
    validateEmailEmpleado,
    validateName,
    validateSurname,
    validateDocument,
    validateBirthDate,
    validateEntryDate,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContext;