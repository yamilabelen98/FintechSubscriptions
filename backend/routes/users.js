const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// Obtener perfil del usuario logueado (requiere autenticación)
router.get("/me", authMiddleware, userController.getProfile);

// (Opcional) Actualizar perfil del usuario
router.put("/me", authMiddleware, userController.updateProfile);

module.exports = router;
