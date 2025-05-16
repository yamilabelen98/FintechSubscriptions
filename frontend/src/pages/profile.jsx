import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Profile() {
  const { user, token, logout, setUser } = useAuth();
  const router = useRouter();
  const [mensaje, setMensaje] = useState("");

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      console.log(data, "la data");
      if (res.ok) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Error al obtener perfil:", err);
    }
  };
  useEffect(() => {
    if (!token) router.push("/login");
    else fetchUser();
  }, [token]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/unsubscribe`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    if (res.ok) {
      setMensaje("💔 Suscripción cancelada con éxito.");
      fetchUser(); // 🔁 recargar estado actualizado sin salir de la vista
      setTimeout(() => setMensaje(""), 5000);
    } else {
      setMensaje("⚠️ Error al cancelar la suscripción.");
      setTimeout(() => setMensaje(""), 5000);
    }
  };

  if (!user) return <p className="text-center text-pink-500">Cargando...</p>;

  const suscripcion = user.suscripcion;

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-[#ffe4f0] w-[400px] p-8 rounded-2xl shadow-lg border border-pink-200 text-center">
        <h1 className="text-2xl font-bold text-pink-500 mb-4">
          🌸 Mi Perfil 🌸
        </h1>

        <p className="text-lg mb-2">
          <strong>Nombre:</strong> {user.nombre}
        </p>
        <p className="text-lg mb-4">
          <strong>Email:</strong> {user.email}
        </p>

        {suscripcion?.estado === "activa" ? (
          <>
            <p className="mb-4">
              <strong>Suscripción:</strong> Plan {suscripcion.plan} activa desde{" "}
              {new Date(suscripcion.fechaPago).toLocaleDateString()}
            </p>
            <button
              onClick={(e) => handleUnsubscribe(e)}
              className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-full transition mb-4 cursor-pointe"
            >
              Cancelar suscripción
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              No estás suscripta a ningún plan actualmente.
            </p>
            <button
              onClick={() => router.push("/plans")}
              className="bg-pink-400 hover:bg-pink-500 text-white py-2 px-4 rounded-full transition mb-4"
            >
              Suscribirme
            </button>
          </>
        )}

        <hr className="my-4 border-pink-200" />

        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => router.push("/")}
            className="text-pink-500 hover:underline text-sm"
          >
            Ir al inicio
          </button>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="text-pink-500 hover:underline text-sm cursor-pointe"
          >
            Cerrar sesión
          </button>
        </div>
        {mensaje && (
          <div className="mt-6 bg-yellow-100 border border-pink-300 text-pink-600 rounded-xl p-3 text-sm transition-all cursor-pointe">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
