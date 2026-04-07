import { Router } from "express";

import {
  getProductos,
  getProductoById,
  crearProductos,
  actualizarProducto,
  eliminarPorducto,
} from "../controllers/productosController.js";

const router = Router();

router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", crearProductos);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarPorducto);

export default router;
