import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import auth from "./src/routes/auth.js";
import produtos from "./src/routes/productos.js";
import ventas from "./src/routes/ventas.js";
import gastos from "./src/routes/gastos.js";
import reportes from "./src/routes/reportes.js";
import authMiddleware from "./src/middleware/auth.js";

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Rutas publicas
app.use("/api/auth", auth);

// Rutas protegidas
app.use("/api/productos", authMiddleware, produtos);
app.use("/api/ventas", authMiddleware, ventas);
app.use("/api/gastos", authMiddleware, gastos);
app.use("/api/reportes", authMiddleware, reportes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Listener On Port ${PORT}`);
});
