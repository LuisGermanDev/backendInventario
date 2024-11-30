const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const protect = async (req, res, next) => {
  // Obtener el token de la cookie 'sesionID'
  const token = req.cookies.sesionID;

  if (!token) {
    return res.status(401).json({ message: "No autorizado, token no encontrado" });
  }

  try {
    // Verificar que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Obtener el usuario del token
    req.user = await User.findById(decoded.id).select("-password");
    next();  // Continuar con la siguiente función (controlador)
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};



const rolesPermitidos = (...roles) => {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.rol)) {
      next();
    } else {
      res.status(403).json({ message: "Acceso denegado, rol no autorizado" });
    }
  };
};

module.exports = { protect,rolesPermitidos };
