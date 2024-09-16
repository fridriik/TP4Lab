import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, type = "button", onClick, variant = "primary", className = "", ...rest }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

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
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  className: PropTypes.string,
};

export default Button;
