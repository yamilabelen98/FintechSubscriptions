import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Fintech Subscriptions</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col justify-center items-center bg-pink-100 px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md text-center border border-pink-200">
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Bienvenida a Fintech Subscriptions 💳
          </h1>
          <p className="text-gray-600 mb-6">
            Gestioná tu perfil, suscribite a un plan y disfrutá una experiencia
            sin complicaciones.
          </p>

          {user ? (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-full transition cursor-pointe"
              >
                Ir a mi perfil
              </button>
              <p className="text-sm mt-4 text-gray-500">
                Sesión activa como {user.nombre}
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-full w-full transition"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => router.push("/register")}
                className="bg-white border border-pink-400 text-pink-500 font-semibold py-2 px-4 rounded-full w-full hover:bg-pink-50 transition"
              >
                Registrarme
              </button>
            </div>
          )}
        </div>

        <footer className="mt-6 text-sm text-gray-500">
          Hecho con 💖 por Yamila
        </footer>
      </div>
    </>
  );
}
