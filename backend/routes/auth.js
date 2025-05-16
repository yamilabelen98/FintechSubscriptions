const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { body } = require("express-validator");

// Validación para registro
router.post(
  "/register",
  [
    body("nombre").notEmpty().withMessage("Nombre es requerido"),
    body("email").isEmail().withMessage("Email inválido"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("La contraseña debe tener al menos 4 caracteres"),
  ],
  register
);

// Validación para login
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email requerido"),
    body("password").notEmpty().withMessage("Password requerido"),
  ],
  login
);

module.exports = router;
