const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Verificar token JWT
const protect = async (req, res, next) => {
  let token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (!token) {
    return res
      .status(401)
      .json({ message: "No autorizado, token no encontrado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// Verificar rol de administrador
// const admin = (req, res, next) => {
//   if (req.user && req.user.rol === "admin") {
//     next();
//   } else {
//     res
//       .status(403)
//       .json({ message: "Acceso denegado, se requiere rol de administrador" });
//   }
// };
// const usuario = (req, res, next) => {
//   if (req.user && req.user.rol === "usuario") {
//     next();
//   } else {
//     res
//       .status(403)
//       .json({ message: "Acceso denegado, se requiere rol de usuario" });
//   }
// };
// const rolesPermitidos = (permitidos, prohibidos = []) => {
//   return (req, res, next) => {
//     if (req.user && permitidos.includes(req.user.rol) && !prohibidos.includes(req.user.rol)) {
//       next();
//     } else {
//       res.status(403).json({ message: "Acceso denegado, rol no autorizado" });
//     }
//   };
// };
//esto se usaria en las rutas
// router.get("/productos", protect, rolesPermitidos(["usuario", "admin"], ["editor"]), getProducts);

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
