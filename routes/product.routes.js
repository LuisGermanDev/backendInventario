const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

const router = express.Router();

// Ruta protegida para listar productos (solo usuarios autenticados)
router.get("/", protect, getProducts); // Ahora solo accesible por usuarios autenticados

// Rutas protegidas (solo admin)
router.post("/", protect, admin, createProduct); // Crear producto
router.put("/:id", protect, admin, updateProduct); // Actualizar producto
router.delete("/:id", protect, admin, deleteProduct); // Eliminar producto

module.exports = router;
