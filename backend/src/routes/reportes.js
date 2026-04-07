import { Router } from "express";
import {
  getResumen,
  getVentasPorDia,
  getStockBajo,
} from "../controllers/reportesController.js";

const router = Router();

router.get("/resumen", getResumen);
router.get("/ventas-por-dia", getVentasPorDia);
router.get("/stock-bajo", getStockBajo);

export default router;
