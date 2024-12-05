import { Router } from "express";
import { getUsuariosAll, loginUsuario } from "../controladores/usuariosCtrl.js";

const router = Router();

// Rutas CRUD para usuarios
router.get("/usuarios", getUsuariosAll); // Obtener todos los usuarios
router.post("/login", loginUsuario); 

export default router;
