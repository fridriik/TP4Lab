import PropTypes from "prop-types";
import styles from "./Input.module.css";

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  required,
  type,
  ...rest
}) => {
  const id = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className={styles.textInputContainer}>
      <input
        type={type || "text"}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={styles.input}
        {...rest}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default Input;
