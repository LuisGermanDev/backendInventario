const mongoose = require("mongoose");

// Esquema del Producto
const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "La categoría del producto es obligatoria"],
      enum: ["tecnología", "alimentos", "ropa", "hogar", "otros"], // Agrega más categorías si es necesario
    },
    precio: {
      type: Number,
      required: [true, "El precio del producto es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    stock: {
      type: Number,
      required: [true, "El stock del producto es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

// Modelo de Producto
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
