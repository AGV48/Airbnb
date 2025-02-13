// pages/api/listings.js
import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Consulta para obtener todos los alojamientos
      const query = `
        SELECT * FROM alojamientos;
      `;

      // Ejecutar la consulta
      const result = await db.query(query);

      console.log('Listings:', result.rows);
      // Retornar los alojamientos en formato JSON
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ message: 'Error fetching listings' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}