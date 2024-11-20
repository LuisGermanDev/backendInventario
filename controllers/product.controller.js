const Product = require("../models/product.model");

// Obtener todos los productos o filtrar por categoría
const getProducts = async (req, res) => {
  const { categoria } = req.query;
  try {
    const query = categoria ? { categoria } : {};
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Crear un nuevo producto (solo admin)
const createProduct = async (req, res) => {
  const { nombre, categoria, precio, stock } = req.body;

  try {
    const product = new Product({ nombre, categoria, precio, stock });
    await product.save();
    res.status(201).json({ message: "Producto creado exitosamente", product });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Actualizar un producto por ID (solo admin)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, stock } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { nombre, categoria, precio, stock },
      { new: true } // Retorna el producto actualizado
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto actualizado exitosamente", product });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar un producto por ID (solo admin)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
