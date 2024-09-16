import styles from './Navbar.module.css';
import PropTypes from 'prop-types'; 

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className={styles.navbar}>
      <button className={styles.hamburger} onClick={onToggleSidebar}>
        ☰
      </button>
      <h1 className={styles.title}>Gestión de empleados</h1>
    </header>
  );
};

Navbar.propTypes = {
	onToggleSidebar: PropTypes.func.isRequired,
  };

export default Navbar;
