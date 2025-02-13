// pages/api/upload-image.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body;
      const result = await cloudinary.uploader.upload(file, {
        folder: '',
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      res.status(500).json({ message: 'Error al subir la imagen' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}