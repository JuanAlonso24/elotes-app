import mongoose from "mongoose";

const ventasSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
    total: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model("Ventas", ventasSchema);
