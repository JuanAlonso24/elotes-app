import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "elote",
  });
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    const { data } = await api.get("/productos");
    setProductos(data);
  };

  useEffect(() => {
    const init = async () => {
      cargarProductos();
    };
    init();
  }, []);

  const handleSubmit = async () => {
    if (!form.nombre || !form.precio || !form.stock) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      await api.post("/productos", form);
      setForm({ nombre: "", precio: "", stock: "", categoria: "elote" });
      setError("");
      cargarProductos();
    } catch (e) {
      setError("Error al crear producto", e);
    }
  };

  const eliminar = async (id) => {
    await api.delete(`/productos/${id}`);
    cargarProductos();
  };

  return (
    <div>
      <h2 style={styles.titulo}>📦 Productos</h2>

      {/* Formulario */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Agregar producto</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.grid}>
          <input
            style={styles.input}
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Precio ($)"
            type="number"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
          <select
            style={styles.input}
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="elote">Elote</option>
            <option value="snack">Snack</option>
            <option value="bebida">Bebida</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <button style={styles.btn} onClick={handleSubmit}>
          Agregar
        </button>
      </div>

      {/* Tabla */}
      <div style={styles.card}>
        <h3 style={styles.subtitulo}>Inventario</h3>
        <div className="tabla-wrapper">
          <table style={styles.tabla}>
            <thead>
              <tr>
                {["Nombre", "Precio", "Stock", "Categoría", "Acción"].map(
                  (h) => (
                    <th key={h} style={styles.th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}>{p.nombre}</td>
                  <td style={styles.td}>${p.precio}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        color: p.stock < 5 ? "#e74c3c" : "#27ae60",
                        fontWeight: "bold",
                      }}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td style={styles.td}>{p.categoria}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.btnDanger}
                      onClick={() => eliminar(p._id)}
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
  tr: { transition: "background 0.2s" },
  error: { color: "#e74c3c", marginBottom: "10px", fontSize: "14px" },
};
