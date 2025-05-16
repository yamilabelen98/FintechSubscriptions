const Plan = require("../models/Plan");
const User = require("../models/User");
const { sendSubscriptionEmail } = require("../utils/emails");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Listar planes disponibles
exports.listPlans = async (req, res) => {
  try {
    const plans = await Plan.find().select("-__v"); // Excluir campo innecesario
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los planes." });
  }
};

// Suscribir usuario a un plan (versión con simulación e integración conceptual con Stripe)
exports.subscribe = async (req, res) => {
  try {
    const { planNombre } = req.body;

    if (!planNombre) {
      return res
        .status(400)
        .json({ message: "Debes especificar el nombre del plan." });
    }
    console.log(planNombre, "→ plan solicitado");

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const plan = await Plan.findOne({ nombre: planNombre });
    if (!plan) {
      return res
        .status(400)
        .json({ message: "El plan especificado no existe." });
    }

    // 🔒 En un caso real, aca se integra Stripe (Checkout, PaymentIntent o Subscriptions API)
    /*
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: "price_id_real", quantity: 1 }],
      customer_email: user.email,
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });
    */

    // 💡 Simulación del resultado del pago (cambiar a false para simular fallos)
    const pagoExitoso = true;

    if (!pagoExitoso) {
      return res.status(402).json({
        success: false,
        message: "Pago fallido. No se activó la suscripción.",
      });
    }

    // 📦 Si el pago es exitoso: actualizar datos del usuario
    const fechaPago = new Date();
    const nextPaymentDate = new Date(fechaPago);

    if (plan.periodo === "mensual") {
      nextPaymentDate.setMonth(fechaPago.getMonth() + 1);
    } else if (plan.periodo === "anual") {
      nextPaymentDate.setFullYear(fechaPago.getFullYear() + 1);
    }

    user.suscripcion = {
      plan: plan.nombre,
      estado: "activa",
      fechaPago,
    };

    await user.save();
    await sendSubscriptionEmail({
      to: user.email,
      nombre: user.nombre,
      plan: plan.nombre,
    });

    return res.status(200).json({
      success: true,
      message: `Te has suscripto al plan ${plan.nombre} exitosamente.`,
      redirectTo: "/profile",
    });

    // return res.json({
    //   message: "Suscripción activada (modo simulado).",
    //   plan: plan.nombre,
    //   nextPaymentDate,
    // });
  } catch (err) {
    console.error("❌ Error en subscribe:", err);
    res.status(500).json({ message: "Error al procesar la suscripción." });
  }
};

// Cancelar suscripción
exports.unsubscribe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.suscripcion || user.suscripcion.estado !== "activa") {
      return res
        .status(400)
        .json({ message: "No tienes una suscripción activa." });
    }

    user.suscripcion.estado = "cancelada";

    await user.save();

    res.json({ message: "Suscripción cancelada." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cancelar la suscripción." });
  }
};

// Consultar estado de suscripción
exports.subscriptionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("suscripcion");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({ suscripcion: user.suscripcion || null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al consultar la suscripción." });
  }
};
