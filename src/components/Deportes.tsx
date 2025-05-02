"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRunning, FaGamepad, FaFutbol, FaSwimmer, FaChess,FaStar } from "react-icons/fa";

const deportes = [
  { nombre: "Fútbol", tipo: "futbol", img: "/images/deportes/futbol.jpg", ubicaciones: 15, icon: <FaFutbol size={24} /> },
  { nombre: "Natación", tipo: "natacion", img: "/images/deportes/natacion.jpg", ubicaciones: 8, icon: <FaSwimmer size={24} /> },
  { nombre: "Vóley", tipo: "voley", img: "/images/deportes/voley.jpg", ubicaciones: 5, icon: <FaRunning size={24} /> },
  { nombre: "Ajedrez", tipo: "ajedrez", img: "/images/deportes/ajedrez.png", ubicaciones: 3, icon: <FaChess size={24} /> },
  { nombre: "Billar", tipo: "billar", img: "/images/deportes/billar.jpg", ubicaciones: 12, icon: <FaRunning size={24} /> },
  { nombre: "Tenis", tipo: "tenis", img: "/images/deportes/tenis.jpg", ubicaciones: 10, icon: <FaRunning size={24} /> },
];
export default function Deportes() {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Nuestros Deportes</h2>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {deportes.map((deporte, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Imagen */}
                <div className="relative">
                  <Image
                    src={deporte.img}
                    alt={deporte.nombre}
                    width={500}
                    height={300}
                    className="object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <span className="text-2xl font-semibold">{deporte.nombre}</span>
                      <div className="flex justify-center mt-2 text-yellow-400">
                        {/* Estrellas de valoración */}
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-yellow-400 ${i < 4 ? "text-opacity-90" : "text-opacity-50"}`} />
                        ))}
                      </div>
                      <div className="mt-2">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                          {deporte.ubicaciones > 10 ? "12+" : deporte.ubicaciones} ubicaciones
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Icono del deporte */}
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-lg group-hover:bg-green-600 group-hover:text-white transition duration-300">
                  <div className="text-gray-600 group-hover:text-white transition duration-300">
                    {deporte.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }