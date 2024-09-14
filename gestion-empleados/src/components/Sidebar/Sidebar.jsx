import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import PropTypes from 'prop-types'; 

const Sidebar = ({ isOpen, onClose, logout }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/empleados">Empleado</Link>
          </li>
          <li>
            <button className={styles.logoutButton} onClick={() => logout()}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
  };

export default Sidebar;