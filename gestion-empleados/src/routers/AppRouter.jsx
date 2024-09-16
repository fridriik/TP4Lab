import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login, Home, Empleado, EmpleadoData, AgregarEmpleado } from "../pages";
import { PublicLayout, PrivateLayout } from "../layouts";

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/empleados" element={<Empleado />} />
            <Route path="/empleados/agregar" element={<AgregarEmpleado />} />
            <Route path="/empleados/:id" element={<EmpleadoData />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
