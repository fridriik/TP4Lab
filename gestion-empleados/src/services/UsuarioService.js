const API_URL = 'http://localhost:3000/auth';

export const autenticarUsuario = async (email, password) => {
    try {        
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al obtener usuarios');
        }

        const users = await response.json();
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            throw new Error('Credenciales incorrectas');
        }

        localStorage.setItem('token', user.token);
        return user;
    } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
    }
};

export const cerrarSesion = () => {
    localStorage.removeItem('token');
};

export const obtenerTokenDelLocalStorage = () => {
    const token = localStorage.getItem('token');
    return token;
};

export const estaAutenticado = () => {
    const token = obtenerTokenDelLocalStorage();
    const isAuthenticated = !!token;
    return isAuthenticated;
};
