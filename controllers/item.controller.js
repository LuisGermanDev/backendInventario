const item = require("../models/item.model");

// Obtener todos los items o filtrar por categoría
const getItems = async (req, res) => {
  const { nombre } = req.query;
  try {
    const query = nombre ? { nombre } : {};
    const items = await item.find(query);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener items", error });
  }
};

// Crear un nuevo item
const createItem = async (req, res) => {
  const { nombre, detalle, estado } = req.body;

  try {
    const newItem = new item({ nombre, detalle, estado });
    await newItem.save();
    res.status(201).json({ message: "Item creado exitosamente", newItem });
  } catch (error) {
    res.status(500).json({ message: "Error al crear item", error });
  }
};

// Actualizar un item por ID
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { nombre, detalle, estado } = req.body;

  try {
    const updatedItem = await item.findByIdAndUpdate(
      id,
      { nombre, detalle, estado },
      { new: true } // Retorna el item actualizado
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }
    res.status(200).json({ message: "Item actualizado exitosamente", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar item", error });
  }
};

// Eliminar un item por ID
const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item no encontrado" });
    }
    res.status(200).json({ message: "Item eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar item", error });
  }
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
