"use client";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaTrophy } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!mobileOpen) {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-extrabold tracking-tight text-white lg:text-green-700">
            SportFinder
          </a>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 items-center text-white lg:text-gray-700">
            <li><a href="#" className="hover:font-semibold transition">Inicio</a></li>
            <li><a href="#" className="hover:font-semibold transition">Cancha</a></li>
            <li><a href="#" className="hover:font-semibold transition">Reservas</a></li>
            <li><a href="#" className="hover:font-semibold transition">Contacto</a></li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:font-semibold transition">
                <FaTrophy className="text-lg" /> Torneos
              </a>
            </li>
          </ul>

          {/* Iconos */}
          <div className="flex items-center space-x-4">
            <button className="text-white lg:text-gray-700 hover:font-semibold transition text-lg">
              <FaUserCircle />
            </button>
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white text-2xl transition-transform duration-300"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fondo oscuro de fondo cuando el menú está abierto */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu} // cerrar si se hace click fuera del panel
        />
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 shadow-lg ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 py-4 mt-14">
          <ul className="flex flex-col space-y-6 text-gray-800 text-lg">
            <li><a href="#" className="block hover:font-semibold transition">Inicio</a></li>
            <li><a href="#" className="block hover:font-semibold transition">Cancha</a></li>
            <li><a href="#" className="block hover:font-semibold transition">Reservas</a></li>
            <li><a href="#" className="block hover:font-semibold transition">Contacto</a></li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:font-semibold transition">
                <FaTrophy /> Torneos
              </a>
            </li>
            <li>
              <button className="flex items-center gap-2 text-gray-800 hover:font-semibold transition">
                <FaUserCircle /><span>Iniciar Sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
