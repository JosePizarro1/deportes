// src/components/Navbar.tsx
'use client'


import { FiLogIn } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(270deg, #14B8A6, #0D9488, #0EA5E9)',
        backgroundSize: '600% 600%',
        animation: 'gradientBG 8s ease infinite',
      }}
    >
      <style jsx>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-white text-2xl font-extrabold tracking-tight">
          SportFinder
        </div>

        {/* Botón Login */}

          <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium rounded-full ring-1 ring-white ring-opacity-60 transition animate-pulse">
            <FiLogIn size={20} />
            <span>Iniciar Sesión</span>
          </button>

      </div>
    </nav>
  )
}
