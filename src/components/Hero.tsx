
export default function Hero() {
  return (
    <header className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-300 to-purple-400 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Contenido */}
      <div className="relative z-10 px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          ¡Encuentra tu cancha perfecta!
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8">
          Con <span className="font-semibold text-white">SportFinder</span> explora y reserva espacios deportivos cerca de ti en segundos.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-green-700 px-8 py-4 rounded-full font-bold uppercase tracking-wider shadow-lg hover:shadow-2xl transition"
        >
          Comenzar ahora
        </a>
      </div>
    </header>
  );
}

