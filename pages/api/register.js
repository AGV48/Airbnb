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
        // Verificar si el usuario ya existe
        const existingUser = await db.query("SELECT * FROM usuarios WHERE nombre = $1", [nombre_completo]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        // Insertar usuario en la base de datos
        await db.query("INSERT INTO usuarios (nombre, contrasena) VALUES ($1, $2)", [nombre_completo, contraseña]);
        return res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}