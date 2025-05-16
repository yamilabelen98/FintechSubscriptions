const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Importar rutas
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const subscriptionsRoutes = require("./routes/subscriptions");

// Importar modelos
const User = require("./models/User");
const Plan = require("./models/Plan");

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", subscriptionsRoutes);

// Ruta inicial básica
app.get("/", (req, res) => {
  res.send("Servidor Node con MongoDB está funcionando correctamente.");
});

// Conexión ÚNICA a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado exitosamente a MongoDB");

    // Crear usuario inicial (si no existe)
    const userExists = await User.findOne({ email: "test@fintech.com" });
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);

      await User.create({
        nombre: "Test User",
        email: "test@fintech.com",
        password: hashedPassword,
      });

      console.log("👤 Usuario creado con éxito con contraseña segura");
    } else {
      console.log("👤 El usuario ya existe en la base de datos");
    }

    // Crear planes iniciales (si no existen)
    const planesIniciales = [
      {
        nombre: "Básico",
        precio: 10,
        periodo: "mensual",
        descripcion: "Plan mensual básico.",
      },
      {
        nombre: "Premium",
        precio: 20,
        periodo: "mensual",
        descripcion: "Plan mensual premium con beneficios adicionales.",
      },
      {
        nombre: "Anual",
        precio: 100,
        periodo: "anual",
        descripcion: "Plan anual con descuento especial.",
      },
    ];

    for (const plan of planesIniciales) {
      const existePlan = await Plan.findOne({ nombre: plan.nombre });
      if (!existePlan) {
        await Plan.create(plan);
        console.log(`📦 Plan "${plan.nombre}" creado.`);
      } else {
        console.log(`📦 El plan "${plan.nombre}" ya existe.`);
      }
    }
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Internal Server Error" });
    });

    // Iniciar servidor solo después de conexión exitosa y datos iniciales cargados
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend escuchando en puerto ${PORT}`);
    });
  })

  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
