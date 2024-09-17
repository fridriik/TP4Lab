"use client";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </div>
  );
};

NotFound.propTypes = {};

export default NotFound;
