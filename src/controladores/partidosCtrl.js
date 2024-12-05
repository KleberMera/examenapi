import { conmysql } from "../db.js";

// Obtener todos los partidos
export const getPartidosAll = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT 
        p.id_par, 
        e1.nombre_eq AS equipo_uno, 
        e2.nombre_eq AS equipo_dos, 
        p.fecha_par, 
        r.descripcion_res AS resultado, 
        p.estado_par
      FROM 
        partido p
      LEFT JOIN 
        equipo e1 ON p.eq_uno = e1.id_eq
      LEFT JOIN 
        equipo e2 ON p.eq_dos = e2.id_eq
      LEFT JOIN 
        resultado r ON p.id_res = r.id_res
    `);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los partidos", error });
  }
};

// Obtener un partido por ID
export const getPartidoById = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conmysql.query(`
      SELECT 
        p.id_par, 
        e1.nombre_eq AS equipo_uno, 
        e2.nombre_eq AS equipo_dos, 
        p.fecha_par, 
        r.descripcion_res AS resultado, 
        p.estado_par
      FROM 
        partido p
      LEFT JOIN 
        equipo e1 ON p.eq_uno = e1.id_eq
      LEFT JOIN 
        equipo e2 ON p.eq_dos = e2.id_eq
      LEFT JOIN 
        resultado r ON p.id_res = r.id_res
      WHERE 
        p.id_par = ?
    `, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el partido", error });
  }
};

// Crear un nuevo partido
export const createPartido = async (req, res) => {
  const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;

  if (!eq_uno || !eq_dos || !fecha_par) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
  }

  try {
    const [result] = await conmysql.query(`
      INSERT INTO partido (eq_uno, eq_dos, fecha_par, id_res, estado_par) 
      VALUES (?, ?, ?, ?, ?)
    `, [eq_uno, eq_dos, fecha_par, id_res, estado_par]);

    res.status(201).json({ message: "Partido creado", id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el partido", error });
  }
};

// Actualizar un partido por ID
export const updatePartido = async (req, res) => {
  const { id } = req.params;
  const { eq_uno, eq_dos, fecha_par, id_res, estado_par } = req.body;

  try {
    const [result] = await conmysql.query(`
      UPDATE partido 
      SET eq_uno = ?, eq_dos = ?, fecha_par = ?, id_res = ?, estado_par = ?
      WHERE id_par = ?
    `, [eq_uno, eq_dos, fecha_par, id_res, estado_par, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json({ message: "Partido actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el partido", error });
  }
};

// Eliminar un partido por ID
export const deletePartido = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conmysql.query(`
      DELETE FROM partido WHERE id_par = ?
    `, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json({ message: "Partido eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el partido", error });
  }
};
