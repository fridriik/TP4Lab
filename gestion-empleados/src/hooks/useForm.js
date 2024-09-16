import { useState } from "react";
import useFormContext from './useFormContext';

const useForm = (initialValues) => {
  const { lastId, validateEmail, validatePassword, validateName, validateSurname, validateDocument, validateBirthDate, validateEntryDate } = useFormContext();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // Función para validar todos los campos
  const validate = () => {
    const newErrors = {};
    newErrors.email = validateEmail(values.email);
    newErrors.password = validatePassword(values.password);
    newErrors.nombre = validateName(values.nombre);
    newErrors.apellido = validateSurname(values.apellido);
    newErrors.nroDocumento = validateDocument(values.nroDocumento);
    newErrors.fechaNacimiento = validateBirthDate(values.fechaNacimiento);
    newErrors.fechaIngreso = validateEntryDate(values.fechaIngreso);
    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    if (validate()) {
      callback();
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, reset, lastId };
};

export default useForm;