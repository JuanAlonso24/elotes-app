import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.msg || "Credenciales incorrectas");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.titulo}>🌽 ElotesApp</h2>
        <p style={styles.subtitulo}>Inicia sesión para continuar</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button style={styles.btn} onClick={handleSubmit}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6f9",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  titulo: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "8px",
    color: "#1a1a2e",
  },
  subtitulo: {
    fontSize: "14px",
    color: "#888",
    textAlign: "center",
    marginBottom: "24px",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "#f5a623",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    marginBottom: "12px",
    textAlign: "center",
  },
};
