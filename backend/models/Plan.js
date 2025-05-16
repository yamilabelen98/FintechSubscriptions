const { Schema, model } = require("mongoose");

const planSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true }, // Básico, Premium ...
    precio: { type: Number, required: true }, // Precio del plan
    periodo: { type: String, required: true }, // Mensual, Anual ...
    descripcion: { type: String }, // Descripción del plan
  },
  { timestamps: true }
);

module.exports = model("Plan", planSchema);
