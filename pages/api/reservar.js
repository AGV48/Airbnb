import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id_alojamiento, nombre_usuario, fecha_inicio, fecha_fin } = req.body;

    try {
      // Verificar si el alojamiento ya está reservado en esas fechas
      const checkQuery = `
        SELECT * FROM reservas
        WHERE id_alojamiento = $1
        AND (
          (fecha_inicio <= $2 AND fecha_fin >= $2) OR
          (fecha_inicio <= $3 AND fecha_fin >= $3) OR
          (fecha_inicio >= $2 AND fecha_fin <= $3)
        );
      `;
      const checkResult = await db.query(checkQuery, [id_alojamiento, fecha_inicio, fecha_fin]);

      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: 'El alojamiento ya está reservado en esas fechas' });
      }

      // Insertar la reserva
      const insertQuery = `
        INSERT INTO reservas (id_alojamiento, nombre_usuario, fecha_inicio, fecha_fin)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const insertResult = await db.query(insertQuery, [id_alojamiento, nombre_usuario, fecha_inicio, fecha_fin]);

      res.status(201).json(insertResult.rows[0]);
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}