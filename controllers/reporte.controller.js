const Reporte = require("../models/reporte.model");   // Importa el modelo de reporte
const User = require("../models/user.model");         // Importa el modelo de usuario (Asegúrate de que la ruta sea correcta)
const LimiteDiario = require("../models/limiteDiario.model");

// Obtener todos los reportes (solo admin)
const getReportesAdmin = async (req, res) => {
  try {
    const reportes = await Reporte.find()
      .populate("id_usuario", "nombre email")  // Poblar los detalles del usuario
      .populate("materialesUsados.id_item", "nombre precio");  // Poblar los detalles de los items

    if (reportes.length === 0) {
      return res.status(404).json({ message: "No hay reportes disponibles" });
    }

    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener los reportes (admin):", error); 
    res.status(500).json({ message: "Error al obtener los reportes", error: error.message });
  }
};

// Obtener los reportes de un técnico (solo el técnico puede ver sus reportes)
const getReportesTecnico = async (req, res) => {
  const id_usuario = req.user._id; // Obtener el id del usuario autenticado

  try {
    const reportes = await Reporte.find({ id_usuario })  // Filtrar los reportes por el id del usuario
      .populate("id_usuario", "nombre email")  // Poblar los detalles del usuario
      .populate("materialesUsados.id_item", "nombre precio");  // Poblar los detalles de los items

    if (reportes.length === 0) {
      return res.status(404).json({ message: "No hay reportes para este técnico" });
    }

    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener los reportes (tecnico):", error); 
    res.status(500).json({ message: "Error al obtener los reportes", error: error.message });
  }
};

// Crear un nuevo reporte
const createReporte = async (req, res) => {
  const { materialesUsados } = req.body;
  const id_usuario = req.user._id; // El ID del técnico autenticado

  try {
    // Verificar el límite diario de materiales del técnico
    const limite = await LimiteDiario.findOne({
      id_tecnico: id_usuario,
      fecha: new Date().toISOString().split('T')[0], // Solo el día de hoy
    });

    if (!limite) {
      return res.status(400).json({ message: "No se ha asignado un límite diario para este técnico" });
    }

    // Obtener los reportes previos del técnico en el día de hoy
    const reportesPrevios = await Reporte.find({ id_usuario, createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });

    // Calcular el total de materiales usados por el técnico en el día
    let totalMaterialUsado = 0;
    reportesPrevios.forEach(reporte => {
      reporte.materialesUsados.forEach(material => {
        totalMaterialUsado += material.cantidad;
      });
    });

    // Calcular el total de materiales usados con los nuevos materiales
    materialesUsados.forEach(material => {
      totalMaterialUsado += material.cantidad;
    });

    // Verificar si el total de materiales usados excede el límite
    let excedeLimite = false;
    materialesUsados.forEach(material => {
      const materialLimitado = limite.materialesAsignados.find(item => item.id_item.toString() === material.id_item);
      if (materialLimitado && totalMaterialUsado > materialLimitado.cantidadMaxima) {
        excedeLimite = true;
      }
    });

    if (excedeLimite) {
      return res.status(400).json({
        message: "El total de materiales usados excede el límite permitido para hoy",
      });
    }

    // Crear el reporte si el límite no se excede
    const nuevoReporte = new Reporte({
      id_usuario,
      materialesUsados,
    });

    await nuevoReporte.save();
    res.status(201).json({ message: "Reporte creado exitosamente", nuevoReporte });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el reporte", error });
  }
};


// Actualizar un reporte por ID
const updateReporte = async (req, res) => {
  const { id } = req.params;
  const { materialUsado } = req.body;

  try {
    const reporteActualizado = await Reporte.findByIdAndUpdate(
      id,
      { materialUsado },
      { new: true } // Retorna el reporte actualizado
    ).populate("id_usuario", "nombre email")
      .populate("materialUsado");

    if (!reporteActualizado) {
      return res.status(404).json({ message: "Reporte no encontrado" });
    }

    res.status(200).json({ message: "Reporte actualizado exitosamente", reporteActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el reporte", error });
  }
};

// Eliminar un reporte por ID
// const deleteReporte = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const reporteEliminado = await Reporte.findByIdAndDelete(id);

//     if (!reporteEliminado) {
//       return res.status(404).json({ message: "Reporte no encontrado" });
//     }

//     res.status(200).json({ message: "Reporte eliminado exitosamente" });
//   } catch (error) {
//     res.status(500).json({ message: "Error al eliminar el reporte", error });
//   }
// };

module.exports = {
  
  createReporte,
  updateReporte,
  getReportesAdmin,
  getReportesTecnico
//   deleteReporte,
};
