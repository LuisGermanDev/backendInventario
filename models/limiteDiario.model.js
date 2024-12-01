const mongoose = require("mongoose");

const limiteDiarioSchema = new mongoose.Schema(
  {
    id_tecnico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",  // Referencia al modelo 'user' para obtener al técnico
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      unique: true,  // Aseguramos que el límite solo pueda ser asignado una vez por día
    },
    materialesAsignados: [
      {
        id_item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "item",  // Referencia al modelo 'item' para los materiales
          required: true,
        },
        cantidadMaxima: {
          type: Number,
          required: true,
          min: [1, "La cantidad máxima no puede ser menor a 1"],
        },
      },
    ],
  },
  {
    timestamps: true,  // Para que se registre cuándo se creó o actualizó
  }
);

const LimiteDiario = mongoose.model("limiteDiario", limiteDiarioSchema);

module.exports = LimiteDiario;
