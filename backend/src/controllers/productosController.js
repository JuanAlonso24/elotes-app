import Producto from "../models/Producto.js";

// Get /api/productos

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true });
    res.json(productos);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

//  GET /api/productos/:id

export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (e) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

//  POST /api/productos

export const crearProductos = async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;
    const producto = new Producto({ nombre, categoria, precio, stock });
    await producto.save();
    res.status(201).json(producto);
  } catch (e) {
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

//  PUT /api/produtos/:id;

export const actualizarProducto = async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;

  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, //devuelve el docuemnto actualizado
    );

    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (e) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// DELETE /api/producto/:id

export const eliminarPorducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true },
    );
    if (!producto)
      return res.status(404).json({ message: "Prodcucto no encontrado" });
  } catch (e) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
