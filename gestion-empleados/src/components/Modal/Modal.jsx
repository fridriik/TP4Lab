"use client";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  onPrimaryAction,
  primaryButtonText,
  secondaryButtonText,
  primaryVariant = "primary",
  secondaryVariant = "secondary",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTitle}>{title}</div>
        <div className={styles.modalContent}>{content}</div>
        <div className={styles.modalActions}>
          <Button variant={primaryVariant} onClick={onPrimaryAction}>
            {primaryButtonText}
          </Button>
          <Button variant={secondaryVariant} onClick={onClose}>
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  onPrimaryAction: PropTypes.func.isRequired,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  primaryVariant: PropTypes.string,
  secondaryVariant: PropTypes.string,
};

export default Modal;
