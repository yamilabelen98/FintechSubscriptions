const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    suscripcion: {
      plan: String, // p.ej. "Premium" o "Básico"
      estado: String, // p.ej. "activa", "inactiva"
      fechaPago: Date, // fecha del último pago
    },
  },
  { timestamps: true }
);
module.exports = model("User", userSchema);
