"use client"

import * as React from "react"
import { BiSearch, BiGlobe, BiMenu, BiUser } from "react-icons/bi"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

type IconComponent = React.FC<{ size?: number; className?: string }>
const SearchIcon = BiSearch as unknown as IconComponent
const GlobeIcon = BiGlobe as unknown as IconComponent
const MenuIcon = BiMenu as unknown as IconComponent
const UserIcon = BiUser as unknown as IconComponent

export function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100 py-3"
                    : "bg-transparent py-5"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <span className={cn(
                            "text-2xl font-black tracking-tighter cursor-pointer transition-colors",
                            isScrolled ? "text-rose-500" : "text-rose-400"
                        )}>
                            SPORT<span className={isScrolled ? "text-black" : "text-white"}>BNB</span>
                        </span>
                    </div>

                    {/* Search Bar */}
                    <div className={cn(
                        "hidden md:flex items-center space-x-4 border rounded-full shadow-sm hover:shadow-md transition-all px-4 py-2 cursor-pointer",
                        isScrolled
                            ? "bg-white border-gray-300"
                            : "bg-white/10 border-white/20 backdrop-blur-md text-white"
                    )}>
                        <div className={cn("text-sm font-semibold border-r pr-4", isScrolled ? "text-gray-900 border-gray-300" : "text-white border-white/20")}>
                            Deporte
                        </div>
                        <div className={cn("text-sm font-semibold border-r pr-4", isScrolled ? "text-gray-900 border-gray-300" : "text-white border-white/20")}>
                            Cualquier fecha
                        </div>
                        <div className={cn("text-sm pr-2 focus:outline-none", isScrolled ? "text-gray-500" : "text-white/70")}>
                            Invitados
                        </div>
                        <div className="bg-rose-500 rounded-full p-2 text-white">
                            <SearchIcon size={16} />
                        </div>
                    </div>

                    {/* Right User Actions */}
                    <div className="flex items-center space-x-4">
                        <div className={cn(
                            "text-sm font-semibold px-3 py-2 rounded-full cursor-pointer transition-colors",
                            isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        )}>
                            Publica tu centro
                        </div>
                        <div className={cn(
                            "p-2 rounded-full cursor-pointer transition-colors",
                            isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                        )}>
                            <GlobeIcon size={20} />
                        </div>
                        <div className={cn(
                            "flex items-center border rounded-full p-2 space-x-2 hover:shadow-md cursor-pointer transition-shadow",
                            isScrolled ? "bg-white border-gray-300" : "bg-white/10 border-white/20"
                        )}>
                            <MenuIcon size={20} className={isScrolled ? "text-gray-700" : "text-white"} />
                            <div className="bg-gray-500 rounded-full p-1 text-white">
                                <UserIcon size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
