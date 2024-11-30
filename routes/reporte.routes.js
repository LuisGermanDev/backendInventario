const express = require("express");
const {
  getReportesAdmin,
  getReportesTecnico,
  createReporte,
  updateReporte,
} = require("../controllers/reporte.controller");
const { protect, rolesPermitidos } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta para obtener todos los reportes (solo admin)
router.get("/", protect, rolesPermitidos("admin"), getReportesAdmin);

// Ruta para obtener los reportes de un técnico (solo técnicos pueden ver los suyos)
router.get("/tecnico", protect, rolesPermitidos("tecnico"), getReportesTecnico);

// Ruta protegida para crear un nuevo reporte (solo técnicos y administradores)
router.post("/", protect, rolesPermitidos("tecnico", "admin"), createReporte);

// Ruta protegida para actualizar un reporte (solo administradores)
router.put("/:id", protect, rolesPermitidos("admin","tecnico"), updateReporte);

// Ruta protegida para eliminar un reporte (solo administradores)
//router.delete("/:id", protect, rolesPermitidos("admin"), deleteReporte);

module.exports = router;
