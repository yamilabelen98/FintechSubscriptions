const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registro de usuarios
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validación simple de campos
    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor completa todos los campos." });
    }

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email ya registrado." });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Crear usuario nuevo
    const newUser = await User.create({ nombre, email, password: hashedPass });

    // Devolver éxito (sin la contraseña por seguridad)
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor durante el registro." });
  }
};

// Login de usuarios
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación simple de campos
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor completa todos los campos." });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Devolver token y datos básicos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        suscripcion: user.suscripcion,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor durante el login." });
  }
};
