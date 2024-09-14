const API_URL = 'http://localhost:3000/usuarios';

// Obtener un usuario por email y contraseña
export const autenticarUsuario = async (email, password) => {
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
};
