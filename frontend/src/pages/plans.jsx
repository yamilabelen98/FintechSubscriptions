import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Plans({ plans }) {
  const { token } = useAuth();
  const router = useRouter();
  const [mensaje, setMensaje] = useState("");

  const subscribeToPlan = async (planNombre) => {
    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ planNombre }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.url) {
          window.location.href = data.url; // Si usa Stripe
        } else {
          setMensaje("✨ Suscripción completada con éxito.");
          setTimeout(() => {
            router.push("/profile");
          }, 2000); // da tiempo a leer el mensaje
        }
      } else {
        setMensaje("⚠️ Error al suscribirse: " + data.message);
        setTimeout(() => setMensaje(""), 5000);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error de red al intentar suscribirse.");
      setTimeout(() => setMensaje(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">
      <div className="bg-[#ffe4f0] p-8 rounded-2xl shadow-lg border border-pink-200 max-w-2xl w-full text-center">
        <h1 className="text-2xl font-bold text-pink-500 mb-6">
          🌸 Planes disponibles 🌸
        </h1>

        <div className="flex flex-col gap-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-xl border border-pink-200 p-6 text-left shadow-sm"
            >
              <h3 className="text-lg font-semibold text-pink-600">
                {plan.nombre}
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Precio:</strong> ${plan.precio} USD / {plan.periodo}
              </p>
              <p className="text-sm text-gray-600 italic mb-3">
                {plan.descripcion}
              </p>
              <button
                onClick={() => subscribeToPlan(plan.nombre)}
                className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-2 rounded-full transition text-sm cursor-pointe"
              >
                Suscribirme a {plan.nombre}
              </button>
            </div>
          ))}
        </div>

        {mensaje && (
          <div className="mt-6 bg-yellow-100 border border-pink-300 text-pink-600 rounded-xl p-3 text-sm transition-all">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`);
  const plans = await res.json();
  return { props: { plans } };
}
