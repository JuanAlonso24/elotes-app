import Gastos from "../models/Gastos.js";

// GET /api/gastos

export async function getGastos(req, res) {
  try {
    const gastos = await Gastos.find().sort({ fecha: -1 });
    res.json(gastos);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener gastos" });
  }
}

// POST /api/gastos

export async function crearGastos(req, res) {
  try {
    const { descripcion, monto, categoria } = req.body;
    const gastos = new Gastos({ descripcion, monto, categoria });
    await gastos.save();
    res.status(200).json(gastos);
  } catch (e) {
    res.status(500).json({ msg: "Error al crear gastos " });
  }
}

// DELETE /api/gastos/:id

export async function deleteGastos(req, res) {
  try {
    const gasto = await Gastos.findByIdAndDelete(req.params.id);
    if (!gasto)
      return res.status(404).json({ message: "Gastos no encontrados" });
  } catch (e) {
    res.status(500).json({ msg: "Error al eliminar gasto" });
  }
}
