import { useRouter } from "next/router";

export default function Cancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center px-4">
      <div className="bg-[#ffe4f0] p-8 rounded-2xl shadow-lg border border-pink-200 max-w-md w-full">
        <h1 className="text-2xl font-bold text-pink-500 mb-4">
          💔 Suscripción cancelada
        </h1>
        <p className="text-gray-700 text-sm mb-6">
          La operación fue cancelada o no se completó. Podés volver a intentar
          cuando quieras.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/plans")}
            className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full text-sm transition"
          >
            Volver a los planes
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="bg-white text-pink-500 border border-pink-300 hover:bg-pink-50 py-2 px-4 rounded-full text-sm transition"
          >
            Ir al perfil
          </button>
        </div>
      </div>
    </div>
  );
}
