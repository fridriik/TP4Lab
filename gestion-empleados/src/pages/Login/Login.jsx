import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';
import Input from './../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    'login'
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async () => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Login falló:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>LOGIN</h1>
      <p>Bienvenido, ingresa tus credenciales por favor</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
};

export default Login;
