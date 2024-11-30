const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller");
const { protect, rolesPermitidos } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta protegida para listar items (solo usuarios autenticados)
router.get("/", protect, rolesPermitidos("admin", "tecnico","gerente"), getItems); // Ahora accesible por usuarios autenticados

// Rutas protegidas (solo admin)
router.post("/", protect, rolesPermitidos("admin"), createItem); // Crear item
router.put("/:id", protect, rolesPermitidos("admin"), updateItem); // Actualizar item
router.delete("/:id", protect, rolesPermitidos("admin"), deleteItem); // Eliminar item

module.exports = router;
