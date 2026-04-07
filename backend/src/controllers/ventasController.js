import Ventas from "../models/Ventas.js";
import Producto from "../models/Producto.js";

// GET /api/ventas

export async function getVentas(req, res) {
  try {
    const ventas = await Ventas.find().populate("producto");
    res.status(200).json(ventas);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// POST /api/ventas
export async function crearVentas(req, res) {
  try {
    const { productoId, cantidad } = req.body;
    const producto = await Producto.findById(productoId);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    if (producto.stock < cantidad) {
      return res.status(400).json({ msg: "stock insuficiente" });
    }
    const total = producto.precio * cantidad;
    const venta = new Ventas({
      producto: productoId,
      cantidad,
      precioUnitario: producto.precio,
      total,
    });

    //Descontar Stock
    producto.stock -= cantidad;
    await producto.save();
    await venta.save();
    res.status(201).json(venta);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// DELETE /api/ventas/:id

export async function deleteVenta(req, res) {
  try {
    const venta = await Ventas.findById(req.params.id);
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });

    // Regresar stock al producto
    await Producto.findByIdAndDelete(venta.producto, {
      $inc: { stock: venta.cantidad },
    });

    await venta.deleteOne();
    res.json({ msg: "Venta eliminada y stock restaurado" });
  } catch (e) {
    res.status(500).json({ msg: "Error al eliminar venta" });
  }
}
