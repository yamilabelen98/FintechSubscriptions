const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    // Buscar al usuario usando el ID extraído del token por el middleware
    const user = await User.findById(req.user.userId).select("-password"); // excluye la contraseña

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener el perfil del usuario." });
  }
};

// Actualizar nombre o password del usuario autenticado
exports.updateProfile = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Si viene nuevo nombre, actualizarlo
    if (nombre) user.nombre = nombre;

    // Si viene nuevo password, encriptarlo
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      user.password = hashedPass;
    }

    // Guardar los cambios
    await user.save();

    // Devolver respuesta sin la contraseña
    res.json({
      message: "Perfil actualizado exitosamente.",
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil." });
  }
};
