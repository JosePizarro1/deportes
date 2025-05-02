import { FaFutbol } from "react-icons/fa";

export default function CanchasDestacadas() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Canchas Destacadas</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Cancha 1 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition">
          <div className="h-48 bg-gradient-to-tr from-green-300 to-blue-400 flex items-center justify-center">
            <FaFutbol className="text-6xl text-white/80" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Cancha de Fútbol 5</h3>
            <p className="text-gray-600 mb-4">Superficie sintética • Iluminación LED • Zona céntrica.</p>
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-blue-600 transition"
            >
              Ver más
            </a>
          </div>
        </div>

        {/* Puedes duplicar este bloque para más canchas */}
      </div>
    </section>
  );
}
