import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer toekn
    if (!token)
      return req.status(401).json({ msg: "No autorizado token requerido" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select("-password");
    if (!req.usuario)
      return res.status(401).json({ msg: "Usuario no encontrado" });

    next();
  } catch (e) {
    res.status(401).json({ msg: "Token no valido o expirado" });
  }
};

export default authMiddleware;
