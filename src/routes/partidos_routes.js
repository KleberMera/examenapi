import { Router } from "express";
import { createPartido, deletePartido, getPartidoById, getPartidosAll, updatePartido } from "../controladores/partidosCtrl.js";


const router = Router();

// Rutas CRUD para `partido`
router.get("/partidos", getPartidosAll); // Obtener todos los partidos
router.get("/partidos/:id", getPartidoById); // Obtener partido por ID
router.post("/partidos", createPartido); // Crear un nuevo partido
router.put("/partidos/:id", updatePartido); // Actualizar partido por ID
router.delete("/partidos/:id", deletePartido); // Eliminar partido por ID

export default router;
