import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/authProvider";
import useAuth from "./context/useAuth"; // 👈
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import Gastos from "./pages/Gastos";

function RutaProtegida({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { token, usuario, logout } = useAuth();

  return (
    <>
      {token && <Navbar usuario={usuario} onLogout={logout} />}
      <div
        style={{
          padding: token ? "16px" : "0",
          maxWidth: "1100px",
          margin: "0 auto",

          ...(window.innerWidth > 768 ? { padding: "24px" } : {}),
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            }
          />
          <Route
            path="/productos"
            element={
              <RutaProtegida>
                <Productos />
              </RutaProtegida>
            }
          />
          <Route
            path="/ventas"
            element={
              <RutaProtegida>
                <Ventas />
              </RutaProtegida>
            }
          />
          <Route
            path="/gastos"
            element={
              <RutaProtegida>
                <Gastos />
              </RutaProtegida>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
