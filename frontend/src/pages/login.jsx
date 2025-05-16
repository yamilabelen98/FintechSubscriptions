import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center font-sans">
      <div className="bg-[#ffe4f0] w-[400px] max-w-[90%] p-8 rounded-2xl shadow-2xl border border-pink-300 text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">
          🌸 Iniciar sesión 🌸
        </h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Ingresar
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          ¿No tenés cuenta?{" "}
          <a
            href="/register"
            className="text-pink-500 hover:underline font-medium cursor-pointe"
          >
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
}
