"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/layout/NavBar"
import { FilterBar } from "@/components/layout/FilterBar"
import { ListingCard } from "@/components/listing-card"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { BiMap } from "react-icons/bi"
import Image from "next/image"

// Dynamic import to effectively handle client-side only libraries
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />
})
const ThreeHero = dynamic(() => import("@/components/ThreeHero"), { ssr: false })

// Mock Data
const MOCK_VENUES = [
  {
    id: "1",
    title: "Urban Soccer Field",
    location: "Downtown Sports Center",
    price: 50,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop",
    sports: ["football"],
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    id: "2",
    title: "Sky High Basketball Court",
    location: "Rooftop Park",
    price: 35,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    sports: ["basketball"],
    lat: 40.4200,
    lng: -3.7100,
  },
  {
    id: "3",
    title: "Elite Tennis Club",
    location: "Green Valley",
    price: 60,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1000&auto=format&fit=crop",
    sports: ["tennis"],
    lat: 40.4150,
    lng: -3.6900,
  },
  {
    id: "4",
    title: "Olympic Swimming Pool",
    location: "Aquatic Center",
    price: 25,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1000&auto=format&fit=crop",
    sports: ["swimming"],
    lat: 40.4100,
    lng: -3.7000,
  },
  {
    id: "5",
    title: "Padel Zone Plus",
    location: "West End",
    price: 40,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=1000&auto=format&fit=crop",
    sports: ["padel"],
    lat: 40.4250,
    lng: -3.7050,
  },
  {
    id: "6",
    title: "Crossfit Box 360",
    location: "Industrial District",
    price: 20,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
    sports: ["gym"],
    lat: 40.4300,
    lng: -3.6950,
  },
]

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [showMap, setShowMap] = useState(false) // For mobile toggle logic if needed

  const filteredVenues = activeFilter === "all"
    ? MOCK_VENUES
    : MOCK_VENUES.filter((v) => v.sports.includes(activeFilter))

  return (
    <main className="min-h-screen bg-white pb-20">
      <NavBar />

      {/* Hero Section with 3D Background & Image */}
      <div className="relative pt-24 pb-16 px-6 sm:px-12 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
          <ThreeHero />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Left Side: Premium Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative group"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/hero-image.png"
                alt="Premium Sports Venue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-2xl flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Centros Premium</span>
                  <span className="text-white/60 text-xs">Estética y Profesionales</span>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-600 flex items-center justify-center text-[10px] text-white">
                      {i}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]"
            >
              MEJORA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                TU JUEGO
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-400 mb-8 font-medium leading-relaxed"
            >
              Encuentra los centros deportivos más estéticos con SportBnB. <br className="hidden lg:block" />
              Instalaciones modernas, equipo profesional y reserva fácil.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              <Button size="lg" className="shadow-2xl shadow-rose-600/30 bg-rose-600 hover:bg-rose-700 text-white border-0 px-10">
                Explorar Ahora
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10">
                Ver Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <FilterBar activeFilter={activeFilter} setFilter={setActiveFilter} />

      {/* Main Content: Split View (List + Map) */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Listings Column */}
          <div className="w-full lg:w-3/5 xl:w-[60%]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredVenues.length} {filteredVenues.length === 1 ? "lugar" : "lugares"} para jugar
              </h2>
              <Button
                variant="outline"
                className="lg:hidden flex gap-2 items-center"
                onClick={() => setShowMap(!showMap)}
              >
                <BiMap /> {showMap ? "Mostrar Lista" : "Mostrar Mapa"}
              </Button>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6"
            >
              {filteredVenues.map((venue) => (
                <ListingCard key={venue.id} listing={venue} />
              ))}

              {filteredVenues.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                  No se encontraron lugares para este deporte. Intenta con &quot;Todos&quot;.
                </div>
              )}
            </motion.div>
          </div>

          {/* Map Column - Sticky on Desktop */}
          <div className="hidden lg:block w-full lg:w-2/5 xl:w-[40%] h-[calc(100vh-140px)] sticky top-[140px]">
            <Map venues={filteredVenues} />
          </div>

        </div>
      </div>

    </main>
  )
}
