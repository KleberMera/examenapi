import { conmysql } from '../db.js';

// Controlador para obtener todos los equipos
export const getEquipos = async (req, res) => {
  try {
    const [result] = await conmysql.query('SELECT * FROM equipo'); // Cambia "equipos" por el nombre de tu tabla
    res.json(result); // Enviar los equipos como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los equipos', error });
  }
};
