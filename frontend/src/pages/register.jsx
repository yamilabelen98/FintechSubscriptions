import { useState } from "react";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    if (res.ok) {
      setSuccess("🌸 Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      const data = await res.json();
      setError(data.message || "Error en el registro");
    }
  };

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center font-sans relative">
      <div className="bg-[#ffe4f0] w-[400px] max-w-[90%] p-6 rounded-2xl shadow-2xl border border-pink-300 text-center z-10">
        <h1 className="text-2xl font-bold text-pink-500">🌸 Crear cuenta 🌸</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center text-sm"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center text-sm"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center text-sm"
            required
          />
          <button
            type="submit"
            className="bg-pink-400 text-white py-3 rounded-lg font-semibold hover:bg-pink-500 transition duration-200 cursor-pointe"
          >
            Registrarme
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          ¿Ya tenés cuenta?{" "}
          <a
            href="/login"
            className="text-pink-500 hover:underline font-medium cursor-pointe"
          >
            Iniciar sesión
          </a>
        </p>
      </div>

      {success && (
        <div className="absolute top-10 bg-pink-100 text-pink-600 px-6 py-3 rounded-xl shadow text-sm border border-pink-300 text-center">
          {success}
        </div>
      )}
    </div>
  );
}
