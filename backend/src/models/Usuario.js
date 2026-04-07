import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// Encriptar password antes de guardar.

UsuarioSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Metodo para comprar password.
UsuarioSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Usuario", UsuarioSchema);
