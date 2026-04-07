import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../api/axios";

export default function Dashboard() {
  const [resumen, setResumen] = useState(null);
  const [ventasPorDia, setVentasPorDia] = useState([]);
  const [stockBajo, setStockBajo] = useState([]);
  const [error, setError] = useState("");
  const [filtro, setFiltro] = useState({ inicio: "", fin: "" });

  const cargar = async (inicio = "", fin = "") => {
    try {
      setError("");
      setResumen(null);

      const params = inicio && fin ? `?inicio=${inicio}&fin=${fin}` : "";

      const [r, v, s] = await Promise.all([
        api.get(`/reportes/resumen${params}`),
        api.get(`/reportes/ventas-por-dia${params}`),
        api.get("/reportes/stock-bajo"),
      ]);

      setResumen(r.data);
      setVentasPorDia(
        v.data.map((d) => ({
          fecha: d._id,
          ventas: d.totalDia,
          cantidad: d.numVentas,
        })),
      );
      setStockBajo(s.data.productos);
    } catch (e) {
      console.error("❌ Error completo:", e);

      setError("Error al cargar el dashboard");
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => await cargar();
    init();
  }, []);

  const handleFiltrar = () => {
    if (!filtro.inicio || !filtro.fin) return;
    cargar(filtro.inicio, filtro.fin);
  };

  const handleLimpiar = () => {
    setFiltro({ inicio: "", fin: "" });
    cargar();
  };

  if (error)
    return (
      <div
        style={{
          padding: "20px",
          color: "#e74c3c",
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <h3>❌ Error al conectar con el backend</h3>
        <p>{error}</p>
      </div>
    );

  if (!resumen) return <p>Cargando...</p>;

  const tarjetas = [
    {
      label: "Total ventas",
      valor: `$${resumen.totalVentas}`,
      color: "#27ae60",
    },
    {
      label: "Total gastos",
      valor: `$${resumen.totalGastos}`,
      color: "#e74c3c",
    },
    {
      label: "Ganancia neta",
      valor: `$${resumen.gananciaNeta}`,
      color: resumen.gananciaNeta >= 0 ? "#2980b9" : "#e74c3c",
    },
    { label: "Num. de ventas", valor: resumen.numVentas, color: "#f5a623" },
  ];

  return (
    <div>
      <h2 style={styles.titulo}>🌽 Dashboard</h2>

      {/* Filtro por fecha */}
      <div style={styles.filtroCard}>
        <h3 style={styles.subtitulo}>📅 Filtrar por fecha</h3>
        <div style={styles.filtroGrid}>
          <div>
            <label style={styles.label}>Fecha inicio</label>
            <input
              style={styles.input}
              type="date"
              value={filtro.inicio}
              onChange={(e) => setFiltro({ ...filtro, inicio: e.target.value })}
            />
          </div>
          <div>
            <label style={styles.label}>Fecha fin</label>
            <input
              style={styles.input}
              type="date"
              value={filtro.fin}
              onChange={(e) => setFiltro({ ...filtro, fin: e.target.value })}
            />
          </div>
          <div style={styles.botones}>
            <button style={styles.btn} onClick={handleFiltrar}>
              Filtrar
            </button>
            <button style={styles.btnSecundario} onClick={handleLimpiar}>
              Ver todo
            </button>
          </div>
        </div>
        <div style={styles.accesosRapidos}>
          <span style={styles.labelAtajo}>Accesos rápidos:</span>
          {[
            { label: "Hoy", dias: 0 },
            { label: "Esta semana", dias: 7 },
            { label: "Este mes", dias: 30 },
          ].map((a) => (
            <button
              key={a.label}
              style={styles.btnAtajo}
              onClick={() => {
                const fin = new Date().toISOString().split("T")[0];
                const inicio = new Date(Date.now() - a.dias * 86400000)
                  .toISOString()
                  .split("T")[0];
                setFiltro({ inicio, fin });
                cargar(inicio, fin);
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Alertas de stock bajo */}
      {stockBajo.length > 0 && (
        <div style={styles.alertaCard}>
          <h3 style={styles.alertaTitulo}>⚠️ Productos con stock bajo</h3>
          <div style={styles.alertaGrid}>
            {stockBajo.map((p) => (
              <div
                key={p._id}
                style={{
                  ...styles.alertaItem,
                  borderLeft: `4px solid ${p.stock === 0 ? "#e74c3c" : "#f5a623"}`,
                }}
              >
                <p style={styles.alertaNombre}>{p.nombre}</p>
                <p
                  style={{
                    ...styles.alertaStock,
                    color: p.stock === 0 ? "#e74c3c" : "#f5a623",
                  }}
                >
                  {p.stock === 0 ? "🔴 Sin stock" : `🟡 ${p.stock} unidades`}
                </p>
                <p style={styles.alertaCategoria}>{p.categoria}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tarjetas resumen */}
      <div style={styles.grid}>
        {tarjetas.map((t) => (
          <div key={t.label} style={styles.card}>
            <p style={styles.cardLabel}>{t.label}</p>
            <p style={{ ...styles.valor, color: t.color }}>{t.valor}</p>
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div style={styles.chartCard}>
        <h3 style={styles.subtitulo}>Ventas por día</h3>
        {ventasPorDia.length === 0 ? (
          <p style={{ color: "#aaa" }}>No hay datos en este rango de fechas</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ventasPorDia}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend />
              <Bar
                dataKey="ventas"
                name="Total ($)"
                fill="#f5a623"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
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
  filtroCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  filtroGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    alignItems: "end",
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    color: "#888",
    marginBottom: "4px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  botones: { display: "flex", gap: "8px" },
  btn: {
    background: "#f5a623",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  btnSecundario: {
    background: "#eee",
    color: "#555",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  accesosRapidos: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  labelAtajo: { fontSize: "12px", color: "#888" },
  btnAtajo: {
    background: "#f0f0f0",
    color: "#555",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
  alertaCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    borderTop: "3px solid #f5a623",
  },
  alertaTitulo: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#e67e22",
  },
  alertaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "12px",
  },
  alertaItem: { background: "#fafafa", borderRadius: "8px", padding: "12px" },
  alertaNombre: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "4px",
    color: "#333",
  },
  alertaStock: { fontSize: "13px", fontWeight: "bold", marginBottom: "4px" },
  alertaCategoria: { fontSize: "12px", color: "#aaa" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  chartCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  cardLabel: { fontSize: "13px", color: "#888", marginBottom: "8px" },
  valor: { fontSize: "28px", fontWeight: "bold", margin: 0 },
};
