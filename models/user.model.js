const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    trim: true,
    match: [
      /^\S+@\S+\.\S+$/,
      "Por favor, proporciona un correo electrónico válido",
    ],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  rol: {
    type: String,
    enum: ["admin", "gerente", "tecnico"],
    default: "tecnico", // Por defecto, el rol es "usuario"
  },
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Modelo de Usuario
const User = mongoose.model("user", userSchema);  // Asegúrate de usar "user" en minúscula

module.exports = User;
