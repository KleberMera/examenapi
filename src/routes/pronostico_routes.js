import { Router } from "express";
import { listarPartidos, listarResultados, registrarPronostico, resultadpsPronostico } from "../controladores/pronosticoCtrl.js";
const router = Router();

// Registrar pronósticos de partidos activos
router.post("/pronosticos", registrarPronostico);

// Listar todos los partidos
router.get("/partidos1", listarPartidos);



router.get("/resultados_pron", resultadpsPronostico);

// Listar resultados de partidos
router.get("/resultados", listarResultados);

export default router;
