import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { obtenerTokenDelLocalStorage, autenticarUsuario } from "../services/UsuarioService";
import Spinner from '../components/Spinner/Spinner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = obtenerTokenDelLocalStorage();
      if (token) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const user = await autenticarUsuario(email, password);
    localStorage.setItem('token', user.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;