import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ productoId: "", cantidad: "" });
  const [error, setError] = useState("");

  const cargar = async () => {
    const [v, p] = await Promise.all([
      api.get("/ventas"),
      api.get("/productos"),
    ]);
    setVentas(v.data);
    setProductos(p.data);
  };

  useEffect(() => {
    const init = async () => {
      cargar();
    };
    init();
  }, []);

  const handleSubmit = async () => {
    if (!form.productoId || !form.cantidad) {
      setError("Selecciona un producto y cantidad");
      return;
    }
    try {
      await api.post("/ventas", form);
      setForm({ productoId: "", cantidad: "" });
      setError("");
      cargar();
    } catch (e) {
      setError(e.response?.data?.msg || "Error al registrar venta");
    }
  };

  const eliminar = async (id) => {
    await api.delete(`/ventas/${id}`);
    cargar();
  };

  return (
    <div>
      <h2 style={styles.titulo}>💰 Ventas</h2>

      {/* Formulario */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Registrar venta</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.grid}>
          <select
            style={styles.input}
            value={form.productoId}
            onChange={(e) => setForm({ ...form, productoId: e.target.value })}
          >
            <option value="">Selecciona producto</option>
            {productos.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre} — ${p.precio} (stock: {p.stock})
              </option>
            ))}
          </select>
          <input
            style={styles.input}
            placeholder="Cantidad"
            type="number"
            min="1"
            value={form.cantidad}
            onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
          />
        </div>
        <button style={styles.btn} onClick={handleSubmit}>
          Registrar
        </button>
      </div>

      {/* Tabla */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Historial de ventas</h3>
        <div className="tabla-wrapper">
          <table style={styles.tabla}>
            <thead>
              <tr>
                {[
                  "Producto",
                  "Cantidad",
                  "Precio unit.",
                  "Total",
                  "Fecha",
                  "Acción",
                ].map((h) => (
                  <th key={h} style={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v._id}>
                  <td style={styles.td}>{v.producto?.nombre}</td>
                  <td style={styles.td}>{v.cantidad}</td>
                  <td style={styles.td}>${v.precioUnitario}</td>
                  <td style={styles.td}>
                    <strong>${v.total}</strong>
                  </td>
                  <td style={styles.td}>
                    {new Date(v.fecha).toLocaleDateString("es-MX")}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.btnDanger}
                      onClick={() => eliminar(v._id)}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
