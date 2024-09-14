import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="private-layout">
      <header>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/empleados">Empleado</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© 2024</footer>
    </div>
  );
};

export default PrivateLayout;