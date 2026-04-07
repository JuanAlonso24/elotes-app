import Ventas from "../models/Ventas.js";
import Gastos from "../models/Gastos.js";
import Producto from "../models/Producto.js";
// GET /api/reportes/resumen?incio=2024-01-01&fin=2024-12-31

export const getResumen = async (req, res) => {
  try {
    const { inicio, fin } = req.query;

    const filtro =
      inicio && fin
        ? { fecha: { $gte: new Date(inicio), $lte: new Date(fin) } }
        : {};

    const ventas = await Ventas.find(filtro);
    const gastos = await Gastos.find(filtro);

    const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
    const totalGastos = gastos.reduce((sum, g) => sum + g.monto, 0);

    res.json({
      totalVentas,
      totalGastos,
      gananciaNeta: totalVentas - totalGastos,
      numVentas: ventas.length,
      numGastos: gastos.length,
    });
  } catch (e) {
    res.status(500).json({ msg: "Error al generar reporte" });
  }
};

// GET /api/reportes/ventas-por-dia

export async function getVentasPorDia(req, res) {
  try {
    const resultado = await Ventas.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y%m%d", date: "$fecha" } },
          totalDia: { $sum: "$total" },
          numVentas: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(resultado);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener ventas por dia " });
  }
}

export async function getStockBajo(req, res) {
  try {
    const limite = parseInt(req.query.limite) || 5;

    const productos = await Producto.find({
      stock: { $lte: limite },
      activo: true,
    }).sort({ stock: 1 });

    res.json({
      total: productos.length,
      limite,
      productos,
    });
  } catch (e) {
    res.status(500).json({ msg: "Error al obtener stock bajo" });
  }
}
