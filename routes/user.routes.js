const express = require("express");
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/user.controller");
const { protect, rolesPermitidos } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta para crear un nuevo usuario (solo admin)
router.post("/", protect, rolesPermitidos("admin"), crearUsuario);

// Ruta para obtener todos los usuarios (solo admin)
router.get("/", protect, rolesPermitidos("admin"), obtenerUsuarios);

// Ruta para obtener un solo usuario por ID (solo admin o el propio usuario)
router.get("/:id", protect, rolesPermitidos("admin", "tecnico", "gerente"), obtenerUsuario);

// Ruta para actualizar un usuario (solo admin)
router.put("/:id", protect, rolesPermitidos("admin"), actualizarUsuario);

// Ruta para eliminar un usuario (solo admin)
router.delete("/:id", protect, rolesPermitidos("admin"), eliminarUsuario);

module.exports = router;
