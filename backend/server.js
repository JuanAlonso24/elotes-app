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

// 👇 acepta cualquier subdominio de vercel y localhost
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/productos", authMiddleware, produtos);
app.use("/api/ventas", authMiddleware, ventas);
app.use("/api/gastos", authMiddleware, gastos);
app.use("/api/reportes", authMiddleware, reportes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Listener On Port ${PORT}`);
});
