const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Crear un nuevo usuario (solo admin)
const crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el nuevo usuario
    const user = await User.create({ nombre, email, password, rol });

    // Enviar respuesta exitosa
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Obtener todos los usuarios (solo admin)
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select("-password"); // No devolver la contraseña
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Obtener un solo usuario por ID
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id).select("-password"); // No devolver la contraseña
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar un usuario (solo admin)
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;

  try {
    // Buscar el usuario
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(password, salt);
    }
    if (rol) usuario.rol = rol;

    // Guardar los cambios
    await usuario.save();

    res.status(200).json({ message: "Usuario actualizado exitosamente", usuario });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario (solo admin)
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.remove();

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
