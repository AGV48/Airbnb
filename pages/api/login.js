import db from "../../lib/db"; // Asegúrate de importar correctamente la conexión

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { nombre_completo, contraseña } = req.body;

        if (!nombre_completo || !contraseña) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        // Buscar el usuario en la base de datos
        const userResult = await db.query("SELECT * FROM usuarios WHERE nombre = $1", [nombre_completo]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const usuario = userResult.rows[0];

        // Verificar la contraseña (asumiendo que está almacenada en texto plano, lo cual no es recomendable)
        if (usuario.contrasena !== contraseña) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Retornar el usuario en la respuesta
        return res.status(200).json({ 
            message: "Inicio de sesión exitoso", 
            usuario: {
                nombre_completo: usuario.nombre, // Asegúrate de que el campo sea correcto
                // Puedes incluir más campos del usuario si es necesario
            }
        });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}