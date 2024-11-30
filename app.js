const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.config");
const cookieParser= require('cookie-parser')
// Cargar variables de entorno
dotenv.config();
// Conectar a la base de datos
connectDB();

const app = express();

app.use(cookieParser());
// Middlewares globales
app.use(express.json()); // Manejar JSON en las solicitudes
app.use(cors()); // Habilitar CORS para todas las solicitudes

// Rutas
app.use("/users", require("./routes/auth.routes")); // Rutas de autenticación
app.use("/items", require("./routes/item.routes")); // Rutas de productos
app.use("/reportes",require("./routes/reporte.routes"))
// Ruta inicial de prueba
app.get("/", (req, res) => {
  res.send("¡API funcionando!");
});

module.exports = app;
