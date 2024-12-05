import { Router } from 'express';
import { getEquipos } from '../controladores/equiposCtrl.js';


const router = Router();

// Ruta para obtener todos los equipos
router.get('/equipos', getEquipos);

export default router;
