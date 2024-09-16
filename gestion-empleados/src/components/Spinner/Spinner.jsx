import styles from './Spinner.module.css';

const Spinner = () => (
  <div className={styles.spinnerOverlay}>
    <div className={styles.spinner}>
    </div>
  </div>
);

export default Spinner;
