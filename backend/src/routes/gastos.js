import Router from "express";
import {
  getGastos,
  crearGastos,
  deleteGastos,
} from "../controllers/gastosController.js";

const router = Router();

router.get("/", getGastos);
router.post("/", crearGastos);
router.delete("/:id", deleteGastos);

export default router;
