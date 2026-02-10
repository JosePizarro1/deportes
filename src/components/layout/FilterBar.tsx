"use client"

import { BiBasketball, BiFootball, BiDumbbell, BiTennisBall, BiSwim, BiCycling, BiGlobe } from "react-icons/bi"
import { FaVolleyballBall } from "react-icons/fa"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
// Note: Icons may not have precise representations, ensure imports are correct
import { GiTennisRacket, GiGolfFlag } from "react-icons/gi"

const filters = [
    { id: "all", label: "Todos", icon: BiGlobe },
    { id: "football", label: "Fútbol", icon: BiFootball },
    { id: "basketball", label: "Básquet", icon: BiBasketball },
    { id: "tennis", label: "Tenis", icon: BiTennisBall },
    { id: "padel", label: "Pádel", icon: GiTennisRacket },
    { id: "volleyball", label: "Vóley", icon: FaVolleyballBall },
    { id: "swimming", label: "Natación", icon: BiSwim },
    { id: "gym", label: "Gimnasio", icon: BiDumbbell },
    { id: "cycling", label: "Ciclismo", icon: BiCycling },
    { id: "golf", label: "Golf", icon: GiGolfFlag },
]

export function FilterBar({ activeFilter, setFilter }: { activeFilter: string, setFilter: (f: string) => void }) {
    return (
        <div className="sticky top-[80px] z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex space-x-8 pb-4">
                {filters.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setFilter(category.id)}
                        className={cn(
                            "flex flex-col items-center gap-2 group min-w-[60px] pb-2 transition-all relative outline-none",
                            activeFilter === category.id
                                ? "text-black font-semibold border-b-2 border-black"
                                : "text-gray-500 hover:text-black hover:border-b-2 hover:border-gray-200"
                        )}
                    >
                        <category.icon
                            size={24}
                            className={cn("transition-transform group-hover:scale-110", activeFilter === category.id ? "text-rose-500" : "text-gray-500")}
                        />
                        <span className="text-xs tracking-wide whitespace-nowrap">{category.label}</span>
                        {activeFilter === category.id && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-black"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
