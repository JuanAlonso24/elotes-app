import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

const generarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/registro

export const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe)
      return res.status(400).json({ msg: "El usuario ya esta registrado" });

    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();

    res.status(201).json({
      token: generarToken(usuario._id),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ msg: "Error al registrar usuario", e });
  }
};

// POST /api/auth/login.

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).json({ msg: "Credenciales incorrectas" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(400).json({ msg: "credenciales incorrectas" });

    res.json({
      token: generarToken(usuario._id),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (e) {
    res.status(500).json({ error: "Error al iniciar sesion" });
  }
};

// GET /api/auth/perfil

export const perfil = async (req, res) => {
  req.body(req.usuario);
};
