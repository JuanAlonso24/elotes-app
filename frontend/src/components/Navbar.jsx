import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "🌽 Dashboard" },
  { to: "/productos", label: "📦 Productos" },
  { to: "/ventas", label: "💰 Ventas" },
  { to: "/gastos", label: "💸 Gastos" },
];

export default function Navbar({ usuario, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav
      style={{
        background: "#1a1a2e",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        <span
          style={{ fontSize: "18px", fontWeight: "bold", color: "#f5a623" }}
        >
          🌽 ElotesApp
        </span>

        {/* Hamburguesa — solo móvil via CSS */}
        <button
          className="nav-hamburguesa"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? "✕" : "☰"}
        </button>

        {/* Links desktop */}
        <div className="nav-links-desktop">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              style={({ isActive }) => ({
                color: isActive ? "#1a1a2e" : "#ccc",
                background: isActive ? "#f5a623" : "transparent",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "14px",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Usuario desktop */}
        <div className="nav-user-desktop">
          <span style={{ fontSize: "13px", color: "#ccc" }}>
            👤 {usuario?.nombre}
          </span>
          <button
            onClick={onLogout}
            style={{
              background: "transparent",
              border: "1px solid #555",
              color: "#ccc",
              padding: "6px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`nav-menu-movil ${menuAbierto ? "abierto" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={() => setMenuAbierto(false)}
            style={({ isActive }) => ({
              color: isActive ? "#1a1a2e" : "#ccc",
              background: isActive ? "#f5a623" : "transparent",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              fontSize: "15px",
            })}
          >
            {link.label}
          </NavLink>
        ))}
        <div
          style={{ height: "1px", background: "#2a2a4e", margin: "8px 0" }}
        />
        <span style={{ fontSize: "13px", color: "#888", padding: "4px 16px" }}>
          👤 {usuario?.nombre}
        </span>
        <button
          onClick={onLogout}
          style={{
            background: "transparent",
            border: "1px solid #555",
            color: "#ccc",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "4px",
            textAlign: "left",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
