import { conmysql } from "../db.js";

// Obtener todos los usuarios
export const getUsuariosAll = async (req, res) => {
  try {
    const [result] = await conmysql.query(`
      SELECT * FROM usuario
    `);
    res.json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener usuarios", error });
  }
};

export const loginUsuario = async (req, res) => {
  const { usuario, clave } = req.body; // Se obtienen las credenciales desde el cuerpo de la solicitud.

  if (!usuario || !clave) {
    return res.status(400).json({ message: "Usuario y clave son requeridos" });
  }

  try {
    const [result] = await conmysql.query(
      `
      SELECT 
        u.id_usr, 
        u.nombres, 
        u.usuario, 
        u.per_id, 
        p.descripcion AS perfil
      FROM 
        usuario u
      INNER JOIN 
        perfil p ON u.per_id = p.per_id
      WHERE 
        u.usuario = ? 
        AND u.clave = ?
      `,
      [usuario, clave]
    );

    // Verificar si las credenciales son válidas
    if (result.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Retornar datos del usuario
    res.json({
      message: "Login exitoso",
      usuario: result[0], // Incluye los datos del usuario autenticado
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
