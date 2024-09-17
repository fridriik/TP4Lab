import PropTypes from "prop-types";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ children, type = "button", onClick, to, variant = "default", className = "", ...rest }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string, 
  variant: PropTypes.oneOf(["default", "primary", "secondary", "danger", "success", "link"]),
  className: PropTypes.string,
};

export default Button;