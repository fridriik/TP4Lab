import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/l10n/es.js";
import styles from "./Input.module.css";

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  required,
  type,
  validate,
  errorMessage,
  ...rest
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const id = name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputRef = useRef(null);

  useEffect(() => {
    if (type === "date" && inputRef.current) {
      flatpickr(inputRef.current, {
        dateFormat: "Y-m-d",
        locale: "es",
        onChange: (selectedDates, dateStr) => {
          onChange({ target: { name, value: dateStr } });
        },
      });
    }
  }, [type, name, onChange]);

  const handleBlur = () => {
    setTouched(true);
    if (validate && !validate(value)) {
      setError(errorMessage || "Este campo es inválido.");
    } else {
      setError("");
    }
  };

  const handleChange = (e) => {
    setError("");
    onChange(e);
  };

  return (
    <div className={styles.textInputContainer}>
      <label
        htmlFor={id}
        className={`${styles.label} ${
          value || touched ? styles.labelFloat : ""
        }`}
      >
        {placeholder}
      </label>

      <input
        type={type || "text"}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setTouched(true)}
        required={required}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        ref={inputRef}
        {...rest}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  validate: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default Input;