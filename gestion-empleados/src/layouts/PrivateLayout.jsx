import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/Spinner";
import styles from "./PrivateLayout.module.css";
import { useAuth } from "../hooks/useAuth";

const PrivateLayout = () => {
  const { logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //para testing del spinner
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        logout={logout}
      />
      <main className={styles.main}>{loading ? <Spinner /> : <Outlet />}</main>
    </div>
  );
};

export default PrivateLayout;
