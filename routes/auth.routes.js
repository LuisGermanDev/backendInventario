const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.controller");

const router = express.Router();

// Ruta para registrar un usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para cerrar sesión
router.post("/logout", logoutUser);

module.exports = router;
