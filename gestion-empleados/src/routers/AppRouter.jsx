import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Home, Empleado, EmpleadoData, AgregarEmpleado, NotFound } from "../pages";
import { PublicLayout, PrivateLayout } from "../layouts";
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/empleados" element={<Empleado />} />
            <Route path="/empleados/agregar" element={<AgregarEmpleado />} />
            <Route path="/empleados/:id" element={<EmpleadoData />} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
