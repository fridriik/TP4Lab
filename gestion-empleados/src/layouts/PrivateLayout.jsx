import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/Spinner";
import styles from "./PrivateLayout.module.css";
import { useAuth } from "../hooks/useAuth";

const PrivateLayout = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  //para testing del spinner
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);


  return (
    <div className={styles.layout}>
      <Navbar logout={logout} />
      <main className={styles.main}>{loading ? <Spinner /> : <Outlet />}</main>
    </div>
  );
};

export default PrivateLayout;
