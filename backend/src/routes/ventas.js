import Router from "express";
import {
  getVentas,
  crearVentas,
  deleteVenta,
} from "../controllers/ventasController.js";
const router = Router();

router.get("/", getVentas);
router.post("/", crearVentas);
router.delete("/:id", deleteVenta);

export default router;
