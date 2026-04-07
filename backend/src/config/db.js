import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (e) {
    console.error(`Error de conexion: ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
