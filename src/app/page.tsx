// app/page.tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const deportes = [
  { nombre: 'Fútbol',     tipo: 'futbol',   img: '/images/deportes/futbol.jpg' },
  { nombre: 'Natación',   tipo: 'natacion', img: '/images/deportes/natacion.jpg' },
  { nombre: 'Vóley',      tipo: 'voley',    img: '/images/deportes/voley.jpg' },
  { nombre: 'Ajedrez',    tipo: 'ajedrez',  img: '/images/deportes/ajedrez.png' },
  { nombre: 'Billar',    tipo: 'billar',  img: '/images/deportes/billar.jpg' },
  { nombre: 'Tenis',      tipo: 'tenis',    img: '/images/deportes/tenis.jpg' },
  { nombre: 'Running',    tipo: 'running',  img: '/images/deportes/running.jpg' },
  { nombre: 'Ciclismo',   tipo: 'ciclismo', img: '/images/deportes/ciclismo.jpg' },
]

export default function Home() {
  return (
    <div className={`${poppins.variable} font-sans`}>
      <Navbar />
      <Hero />


      {/* Deportes Grid */}
      <main
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(to bottom, rgba(20,184,166,0.1), rgba(20,184,166,0.05))',
      }}
    >
      <h2
        id="deportes"
        className="text-2xl sm:text-3xl font-semibold text-center mb-8"
        style={{ color: '#14B8A6' }}
      >
        🏟️ Elige un deporte
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {deportes.map((dep) => (
          <Link key={dep.tipo} href="#">
            <div className="group cursor-pointer">
              {/* Borde degradado jade/manual */}
              <div
                style={{
                  padding: '2px',
                  background: 'linear-gradient(45deg, #14B8A6, #0EA5E9)',
                  borderRadius: '16px',
                }}
              >
                {/* Fondo interior blanco */}
                <div
                  className="overflow-hidden shadow-lg group-hover:shadow-2xl transition"
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                  }}
                >
                  {/* Imagen */}
                  <div className="relative h-40 w-full">
                    <Image
                      src={dep.img}
                      alt={dep.nombre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  {/* Nombre sobre banda jade semitransparente */}
                  <div
                    className="text-center py-2"
                    style={{ background: 'rgba(20,184,166,0.8)', color: '#ffffff' }}
                  >
                    <h3 className="text-lg font-medium">{dep.nombre}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>

    </div>
  )
}
