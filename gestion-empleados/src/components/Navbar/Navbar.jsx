import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./../Button/Button";
import styles from "./Navbar.module.css";

const Navbar = ({ logout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <h1 className={styles.title}>Gestión de empleados</h1>
        <Button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </Button>
        <div className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}>
          <Button to="/home" variant="link">
            Home
          </Button>
          <Button to="/empleados" variant="link">
            Empleados
          </Button>
          <Button onClick={logout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.iconExit}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24px"
              height="24px"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
              <path d="M9 9l3 3-3 3M12 12H3" />
            </svg>
          </Button>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
