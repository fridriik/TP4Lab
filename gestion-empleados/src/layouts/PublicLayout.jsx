import { Outlet } from "react-router-dom";
import styles from "./PublicLayout.module.css";

const PublicLayout = () => {

  return (
    <div className={styles.layout}>
      <header></header>
      <main className={styles.main}><Outlet /></main>
      <footer></footer>
    </div>
  );
};

export default PublicLayout;
