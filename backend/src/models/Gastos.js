import mongoose from "mongoose";

const GastosSchema = new mongoose.Schema(
  {
    descripcion: { type: String, required: true },
    monto: { type: Number, required: true },
    categoria: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Gastos", GastosSchema);
