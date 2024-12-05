import { Router } from "express";
import { listarPartidos, listarResultados, registrarPronostico } from "../controladores/pronosticoCtrl.js";
const router = Router();

// Registrar pronósticos de partidos activos
router.post("/pronosticos", registrarPronostico);

// Listar todos los partidos
router.get("/partidos1", listarPartidos);

// Listar resultados de partidos
router.get("/resultados", listarResultados);

export default router;
