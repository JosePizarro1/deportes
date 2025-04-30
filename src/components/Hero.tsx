import Image from 'next/image'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/images/hero/hero-sports.jpg"        // Ajusta la ruta a tu imagen en /public/images
        alt="Hero SportFinder"
        fill
        className="object-cover object-center opacity-30"
        priority
      />
      {/* Capa de degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-accent/70" />
      {/* Contenido */}
      <div className={`relative z-10 px-4 ${poppins.variable} font-sans`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-4">
          ¡Encuentra tu cancha ideal!
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
          Con SportFinder descubre lugares deportivos cerca de ti y nunca pares de entrenar.
        </p>
      </div>
    </section>
  )
}
