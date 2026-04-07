import mongoose from "mongoose";

const PorductoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Producto", PorductoSchema);
