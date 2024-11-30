const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema(
  {
    id_usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Modelo de usuario
    },
    materialesUsados: [
      {
        id_item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "item", // Modelo de item
          required: [true, "El id del item es obligatorio"],
        },
        cantidad: {
          type: Number,
          required: [true, "La cantidad usada es obligatoria"],
          min: [1, "La cantidad no puede ser menor a 1"],
        },
      },
    ],
  },
  {
    timestamps: true, // Agrega campos de createdAt y updatedAt automáticamente
  }
);

const Reporte = mongoose.model("reporte", reporteSchema);

module.exports = Reporte;
