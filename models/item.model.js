const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
    },
    detalle: {
      type: String,
      required: [true, "La detalle del producto es obligatoria"],
    },
    estado: {
      type: Boolean,
      required: [true, "El estado del item es obligatorio"],
    },
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

// Modelo de Producto
const item = mongoose.model("item", itemSchema);

module.exports = item;
