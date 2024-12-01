const LimiteDiario = require("../models/limiteDiario.model");
const User = require("../models/user.model");
const Item = require("../models/item.model");

// Crear un límite diario de materiales para un técnico
const crearLimiteDiario = async (req, res) => {
  const { id_tecnico, fecha, materialesAsignados } = req.body;

  try {
    // Verificar si el técnico existe
    const tecnico = await User.findById(id_tecnico);
    if (!tecnico) {
      return res.status(404).json({ message: "Técnico no encontrado" });
    }

    // Validación de la cantidad máxima para cada material
    materialesAsignados.forEach((material) => {
      if (material.cantidadMaxima <= 0) {
        return res
          .status(400)
          .json({ message: "La cantidad máxima debe ser mayor que cero" });
      }
    });

    // Verificar si ya existe un límite para este técnico en esta fecha
    const limiteExistente = await LimiteDiario.findOne({ id_tecnico, fecha });
    if (limiteExistente) {
      return res
        .status(400)
        .json({
          message: "Ya existe un límite para este técnico en esta fecha",
        });
    }

    // Crear un nuevo límite para el técnico
    const nuevoLimite = new LimiteDiario({
      id_tecnico,
      fecha,
      materialesAsignados,
    });

    await nuevoLimite.save();

    res
      .status(201)
      .json({ message: "Límite diario asignado exitosamente", nuevoLimite });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el límite diario", error });
  }
};
// Obtener todos los límites de materiales para todos los técnicos (solo admin)
const obtenerTodosLimites = async (req, res) => {
    try {
      // Buscar todos los límites de todos los técnicos
      const limites = await LimiteDiario.find().populate("id_tecnico", "nombre email").populate("materialesAsignados.id_item", "nombre");
  
      if (limites.length === 0) {
        return res.status(404).json({ message: "No se encontraron límites asignados" });
      }
  
      res.status(200).json(limites);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los límites", error });
    }
  };
// Obtener el límite diario de materiales de un técnico para una fecha específica
const obtenerLimiteDiario = async (req, res) => {
  const { tecnicoId, fecha } = req.params;

  try {
    // Buscar el límite diario del técnico para la fecha
    const limite = await LimiteDiario.findOne({ id_tecnico: tecnicoId, fecha });

    if (!limite) {
      return res
        .status(404)
        .json({
          message: "No se encontró un límite para este técnico en esta fecha",
        });
    }

    res.status(200).json(limite);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el límite diario", error });
  }
};
const actualizarLimiteDiario = async (req, res) => {
  const { tecnicoId, fecha } = req.params;
  const { materialesAsignados } = req.body;

  try {
    // Verificar si el límite existe para este técnico en esta fecha
    const limiteExistente = await LimiteDiario.findOne({
      id_tecnico: tecnicoId,
      fecha,
    });

    if (!limiteExistente) {
      return res
        .status(404)
        .json({
          message: "No se encontró un límite para este técnico en esta fecha",
        });
    }

    // Actualizar el límite de materiales asignados
    limiteExistente.materialesAsignados = materialesAsignados;

    // Guardar los cambios en la base de datos
    await limiteExistente.save();

    res
      .status(200)
      .json({
        message: "Límite diario actualizado exitosamente",
        limiteExistente,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el límite diario", error });
  }
};

module.exports = {
  crearLimiteDiario,
  obtenerLimiteDiario,
  actualizarLimiteDiario,
  obtenerTodosLimites,
};
