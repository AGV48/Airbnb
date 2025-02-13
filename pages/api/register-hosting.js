// pages/api/register-hosting.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      nombreUsuario,
      nombreAlojamiento,
      descripcion,
      pais,
      ciudad,
      direccion,
      numeroHabitaciones,
      numeroCamas,
      numeroBaños,
      numeroHuespedes,
      precio,
      politicasPago,
    } = req.body;
    try {
      const query = `
        INSERT INTO alojamientos (
          nombre_usuario, nombre, descripcion, pais, ciudad, direccion, 
          num_habitaciones, num_camas, num_banos, num_huespedes, 
          precio, politica_de_pago
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id_alojamiento;
      `;
      const values = [
        nombreUsuario,
        nombreAlojamiento,
        descripcion,
        pais,
        ciudad,
        direccion,
        numeroHabitaciones,
        numeroCamas,
        numeroBaños,
        numeroHuespedes,
        precio,
        politicasPago,
      ];

      // Usar la conexión de db.js
      const result = await db.query(query, values);

      res.status(200).json({ message: 'Alojamiento registrado con éxito', id_alojamiento: result.rows[0].id_alojamiento });
    } catch (error) {
      console.error('Error al registrar el alojamiento:', error);
      res.status(500).json({ message: 'Error al registrar el alojamiento' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}