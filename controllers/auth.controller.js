const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el nuevo usuario
    const user = await User.create({ nombre, email, password, rol });
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Iniciar sesión
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     Verificar si el usuario existe
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "Usuario no encontrado" });
//     }

//      Verificar la contraseña
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Contraseña incorrecta" });
//     }

//      Generar un token JWT
//     const token = jwt.sign(
//       { id: user._id, rol: user.rol },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(200).json({ token, rol: user.rol });
//   } catch (error) {
//     res.status(500).json({ message: "Error al iniciar sesión", error });
//   }
// };
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET
    );

    // Establecer la cookie sin fecha de expiración (sesión)
    res.cookie("sesionID", token, {
      httpOnly: true, // Solo accesible desde el servidor
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      sameSite: "Strict", // Protección contra CSRF
      path: "/", // Disponible en todas las rutas
    });

    res.status(200).json({ message: "Inicio de sesión exitoso", rol: user.rol });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("sesionID", {
    path: "/", // Debe coincidir con el path de la cookie original
  });
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
};

module.exports = { registerUser, loginUser ,logoutUser};
