const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect, rolesPermitidos } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta protegida para listar productos (solo usuarios autenticados)
router.get("/", protect, rolesPermitidos("admin","usuario"), getProducts); // Ahora solo accesible por usuarios autenticados

// Rutas protegidas (solo admin)
router.post("/", protect, rolesPermitidos("admin"), createProduct); // Crear producto
router.put("/:id", protect, rolesPermitidos("admin"), updateProduct); // Actualizar producto
router.delete("/:id", protect, rolesPermitidos("admin"), deleteProduct); // Eliminar producto

module.exports = router;
