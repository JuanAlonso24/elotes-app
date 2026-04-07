import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    categoria: "insumos",
  });
  const [error, setError] = useState("");

  const cargar = async () => {
    const { data } = await api.get("/gastos");
    setGastos(data);
  };

  useEffect(() => {
    const init = async () => {
      cargar();
    };
    init();
  }, []);

  const handleSubmit = async () => {
    if (!form.descripcion || !form.monto) {
      setError("Descripción y monto son obligatorios");
      return;
    }
    try {
      await api.post("/gastos", form);
      setForm({ descripcion: "", monto: "", categoria: "insumos" });
      setError("");
      cargar();
    } catch (e) {
      setError("Error al registrar gasto", e);
    }
  };

  const eliminar = async (id) => {
    await api.delete(`/gastos/${id}`);
    cargar();
  };

  const total = gastos.reduce((sum, g) => sum + g.monto, 0);

  return (
    <div>
      <h2 style={styles.titulo}>💸 Gastos</h2>

      {/* Formulario */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Registrar gasto</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.grid}>
          <input
            style={styles.input}
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Monto ($)"
            type="number"
            value={form.monto}
            onChange={(e) => setForm({ ...form, monto: e.target.value })}
          />
          <select
            style={styles.input}
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="insumos">Insumos</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <button style={styles.btn} onClick={handleSubmit}>
          Registrar
        </button>
      </div>

      {/* Total */}
      <div style={{ ...styles.card, background: "#fff5e6" }}>
        <p style={{ margin: 0, fontSize: "16px" }}>
          Total gastado:{" "}
          <strong style={{ color: "#e74c3c", fontSize: "20px" }}>
            ${total}
          </strong>
        </p>
      </div>

      {/* Tabla */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Historial de gastos</h3>
        <div className="tabla-wrapper">
          <table style={styles.tabla}>
            <thead>
              <tr>
                {["Descripción", "Monto", "Categoría", "Fecha", "Acción"].map(
                  (h) => (
                    <th key={h} style={styles.th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {gastos.map((g) => (
                <tr key={g._id}>
                  <td style={styles.td}>{g.descripcion}</td>
                  <td style={styles.td}>
                    <strong>${g.monto}</strong>
                  </td>
                  <td style={styles.td}>{g.categoria}</td>
                  <td style={styles.td}>
                    {new Date(g.fecha).toLocaleDateString("es-MX")}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.btnDanger}
                      onClick={() => eliminar(g._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  titulo: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  subtitulo: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#555",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    marginBottom: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    background: "#f5a623",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  btnDanger: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tabla: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #eee",
    fontSize: "13px",
    color: "#888",
  },
  td: { padding: "10px", borderBottom: "1px solid #f0f0f0", fontSize: "14px" },
  error: { color: "#e74c3c", marginBottom: "10px", fontSize: "14px" },
};
