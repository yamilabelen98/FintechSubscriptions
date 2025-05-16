const router = require("express").Router();
const subscriptionsController = require("../controllers/subsController");
const authMiddleware = require("../middleware/auth");

// Listar planes disponibles (público)
router.get("/plans", subscriptionsController.listPlans);

// Suscribir al usuario autenticado a un plan (requiere autenticación)
router.post("/subscribe", authMiddleware, subscriptionsController.subscribe);

// Cancelar suscripción del usuario autenticado (requiere autenticación)
router.post(
  "/unsubscribe",
  authMiddleware,
  subscriptionsController.unsubscribe
);

// Consultar estado actual de la suscripción del usuario autenticado
router.get(
  "/subscription/status",
  authMiddleware,
  subscriptionsController.subscriptionStatus
);

module.exports = router;
