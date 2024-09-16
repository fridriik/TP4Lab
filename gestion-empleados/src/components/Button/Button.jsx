import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, type = "button", onClick }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired, 
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
