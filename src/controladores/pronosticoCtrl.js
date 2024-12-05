import { conmysql } from "../db.js";

// Registrar pronósticos de partidos activos
export const registrarPronostico = async (req, res) => {
  const { id_usr, id_par, id_res, valor } = req.body;

  if (!id_usr || !id_par || !id_res || !valor) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const [partidoActivo] = await conmysql.query(
      `SELECT * FROM partido WHERE id_par = ? AND estado_par = 'activo'`,
      [id_par]
    );

    if (partidoActivo.length === 0) {
      return res.status(404).json({ message: "El partido no está activo o no existe" });
    }

    await conmysql.query(
      `INSERT INTO pronostico (id_usr, id_par, id_res, valor, fecha_registro) 
       VALUES (?, ?, ?, ?, NOW())`,
      [id_usr, id_par, id_res, valor]
    );

    res.status(201).json({ message: "Pronóstico registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar pronóstico", error });
  }
};

// Listar partidos
export const listarPartidos = async (req, res) => {
  try {
    const [partidos] = await conmysql.query(`
      SELECT 
        p.id_par, 
        e1.nombre_eq AS equipo_uno, 
        e2.nombre_eq AS equipo_dos, 
        p.fecha_par, 
        p.estado_par 
      FROM partido p
      INNER JOIN equipo e1 ON p.eq_uno = e1.id_eq
      INNER JOIN equipo e2 ON p.eq_dos = e2.id_eq
    `);

    res.json(partidos);
  } catch (error) {
    res.status(500).json({ message: "Error al listar partidos", error });
  }
};

export const resultadpsPronostico = async (req, res) => {
  try {
    const [resultados] = await conmysql.query(`
       SELECT * FROM resultado
    `);

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al listar resultados", error });
  }
};
// Listar resultados
export const listarResultados = async (req, res) => {
  try {
    const [resultados] = await conmysql.query(`
      SELECT 
        p.id_par, 
        e1.nombre_eq AS equipo_uno, 
        e2.nombre_eq AS equipo_dos, 
        r.descripcion_res AS resultado, 
        p.estado_par 
      FROM partido p
      INNER JOIN equipo e1 ON p.eq_uno = e1.id_eq
      INNER JOIN equipo e2 ON p.eq_dos = e2.id_eq
      LEFT JOIN resultado r ON p.id_res = r.id_res
      WHERE p.id_res IS NOT NULL
    `);

    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al listar resultados", error });
  }
};


