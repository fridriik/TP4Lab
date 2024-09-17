import { useContext } from 'react';
import FormContext from '../contexts/FormContext';

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext debe usarse dentro de un FormProvider');
  }
  return context;
};

export default useFormContext;