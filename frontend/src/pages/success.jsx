import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/profile");
    }, 4000); // redirige después de 4 segundos
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-center px-4">
      <div className="bg-[#ffe4f0] p-8 rounded-2xl shadow-lg border border-pink-200 max-w-md w-full">
        <h1 className="text-2xl font-bold text-pink-500 mb-4">
          ✨ ¡Gracias por tu compra!
        </h1>
        <p className="text-gray-700 text-sm mb-6">
          Tu suscripción fue procesada con éxito. Te redirigiremos a tu perfil
          en unos segundos...
        </p>
        <button
          onClick={() => router.push("/profile")}
          className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full text-sm transition"
        >
          Ir al perfil ahora
        </button>
      </div>
    </div>
  );
}
