const express = require("express");
const {
  crearLimiteDiario,
  obtenerLimiteDiario,
  actualizarLimiteDiario,
  obtenerTodosLimites,
} = require("../controllers/limiteDiario.controller");
const { protect, rolesPermitidos } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta para crear o actualizar el límite diario (solo admin)
router.post("/", protect, rolesPermitidos("admin","gerente"), crearLimiteDiario);

// Ruta para obtener el límite diario de un técnico (solo admin o el propio técnico)
router.get("/:tecnicoId/:fecha", protect, rolesPermitidos("admin", "tecnico"), obtenerLimiteDiario);

// Ruta para actualizar un límite diario de materiales (solo admin)
router.put("/:tecnicoId/:fecha", protect, rolesPermitidos("admin"), actualizarLimiteDiario);

// Nueva ruta para que el admin vea todos los límites de todos los técnicos (solo admin)
router.get("/", protect, rolesPermitidos("admin"), obtenerTodosLimites);

module.exports = router;
