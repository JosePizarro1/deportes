"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    BiCheckCircle,
    BiImageAdd,
    BiListCheck,
    BiLogOut,
    BiChevronLeft,
    BiBuilding,
    BiBadgeCheck,
    BiLandscape,
    BiCube
} from "react-icons/bi"
import {
    MdSportsSoccer,
    MdFitnessCenter,
    MdOutlineWbSunny,
    MdPool,
    MdDirectionsRun,
    MdFilterList
} from "react-icons/md"
import { HiOutlineUserGroup } from "react-icons/hi"

// Icon Mapping for Categories
const ICON_MAP: Record<string, any> = {
    BiSoccer: MdSportsSoccer,
    BiCycling: MdFitnessCenter, // Using gym icon as fallback for now
    BiSun: MdOutlineWbSunny,
    BiSwim: MdPool,
    BiRun: MdDirectionsRun,
    BiBuilding: BiBuilding,
    BiBadgeCheck: BiBadgeCheck,
    BiLandscape: BiLandscape,
    BiCube: BiCube,
    Default: MdFilterList
};

// Fix for react-icons type errors in some Next.js versions
const LogOutIcon = BiLogOut as any
const CheckCircleIcon = BiCheckCircle as any
const ImageAddIcon = BiImageAdd as any
const ListCheckIcon = BiListCheck as any
const UserGroupIcon = HiOutlineUserGroup as any
const ChevronLeftIcon = BiChevronLeft as any

type Step = "commitment" | "overview" | "step1_intro" | "step1_categories"

interface Category {
    _id: string;
    name: string;
    icon: string;
    description: string;
}

export default function HostPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // UI State
    const [step, setStep] = useState<Step>("commitment")
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loadingCategories, setLoadingCategories] = useState(false)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    // Load categories when reaching the selection step
    useEffect(() => {
        if (step === "step1_categories" && categories.length === 0) {
            fetchCategories()
        }
    }, [step])

    const fetchCategories = async () => {
        setLoadingCategories(true)
        try {
            const res = await fetch("/api/services")
            const data = await res.json()
            setCategories(data)
        } catch (error) {
            console.error("Error fetching categories:", error)
        } finally {
            setLoadingCategories(false)
        }
    }

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!session) return null

    // Determine if we show the specialized Host Header/Footer
    const isWizardStep = step === "step1_intro" || step === "step1_categories"

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            {/* --- HEADER --- */}
            <header className="fixed top-0 left-0 w-full h-20 bg-white border-b border-gray-100 px-6 md:px-12 flex items-center justify-between z-50">
                <div className="flex items-center gap-2">
                    <button onClick={() => router.push("/")} className="text-xl font-black text-rose-500 tracking-tighter">SPORTBNB</button>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Host</span>
                </div>

                <div className="flex items-center gap-4">
                    {isWizardStep && (
                        <button className="px-4 py-2 text-sm font-bold border border-gray-300 rounded-full hover:bg-gray-50 transition-all">
                            Guarda y Sal
                        </button>
                    )}
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-rose-500 transition-colors"
                    >
                        <LogOutIcon size={20} />
                        <span className="hidden md:inline">Cerrar sesión</span>
                    </button>
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className={`flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-24`}>
                <AnimatePresence mode="wait">
                    {/* COMMITMENT STEP */}
                    {step === "commitment" && (
                        <motion.div
                            key="commitment"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-2xl w-full"
                        >
                            <UserGroupIcon className="text-rose-500 text-6xl mb-6" />
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Nuestro compromiso de la comunidad</h2>
                            <h1 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                                SportBnB es una comunidad a la que todos pueden pertenecer
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Para garantizar esto, te pedimos que te comprometas con lo siguiente:
                            </p>

                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-10">
                                <p className="text-xl font-medium text-gray-800 leading-relaxed italic">
                                    "Acepto tratar a todos en la comunidad de SportBnB con respeto y sin prejuicios, sin importar la raza, religión, nacionalidad, etnia, discapacidad, sexo, identidad de género, orientación sexual o edad."
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setStep("overview")}
                                    className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-rose-200"
                                >
                                    Aceptar y continuar
                                </button>
                                <button
                                    onClick={() => router.push("/")}
                                    className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-lg border border-gray-300 transition-all"
                                >
                                    Rechazar
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* OVERVIEW STEP */}
                    {step === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16"
                        >
                            <div className="flex-1 lg:max-w-md">
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                                    Empezar a utilizar <br />
                                    <span className="text-rose-500">SportBnB</span> es muy sencillo
                                </h1>
                                <p className="mt-6 text-xl text-gray-500 hidden lg:block">
                                    Te guiaremos en cada paso para que tu centro deportivo esté listo para recibir a sus primeros jugadores.
                                </p>
                                <button
                                    onClick={() => setStep("step1_intro")}
                                    className="hidden lg:block mt-12 px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-rose-200"
                                >
                                    Comencemos
                                </button>
                            </div>

                            <div className="flex-1 w-full space-y-2">
                                <StepItem number={1} title="Describe tu espacio" text="Ubicación y cuántos deportistas pueden jugar." icon={<ListCheckIcon size={48} />} color="rose" />
                                <StepItem number={2} title="Haz que destaque" text="Fotos, un título y una descripción." icon={<ImageAddIcon size={48} />} color="blue" />
                                <StepItem number={3} title="Terminar y publicar" text="Precio y detalles finales." icon={<CheckCircleIcon size={48} />} color="emerald" />

                                <button onClick={() => setStep("step1_intro")} className="lg:hidden w-full mt-6 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl text-lg">
                                    Comencemos
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: INTRO */}
                    {step === "step1_intro" && (
                        <motion.div
                            key="step1_intro"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-12"
                        >
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-gray-900 mb-2">Paso 1</h2>
                                <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Describe tu espacio</h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-lg font-medium">
                                    En este paso, te preguntaremos qué tipo de propiedad tienes y si los huéspedes reservarán el alojamiento entero o solo una habitación. A continuación, indícanos la ubicación y cuántos huéspedes pueden quedarse.
                                </p>
                            </div>
                            <div className="flex-1 relative aspect-square max-w-md w-full bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden border border-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-rose-100/50"></div>
                                <div className="z-10 text-rose-500/20"><ListCheckIcon size={240} /></div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: CATEGORIES */}
                    {step === "step1_categories" && (
                        <motion.div
                            key="step1_categories"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-4xl w-full h-full"
                        >
                            <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight text-center">
                                ¿Cuál de estas opciones describe mejor tu espacio?
                            </h1>

                            {loadingCategories ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className="aspect-square bg-gray-50 animate-pulse rounded-2xl border border-gray-100"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-10">
                                    {categories.map((cat) => {
                                        const Icon = ICON_MAP[cat.icon] || MdSportsSoccer;
                                        const isSelected = selectedCategory === cat._id;
                                        return (
                                            <button
                                                key={cat._id}
                                                onClick={() => setSelectedCategory(cat._id)}
                                                className={`flex flex-col items-start p-4 aspect-[4/3] rounded-2xl border-2 transition-all duration-200 text-left relative group ${isSelected
                                                    ? "border-rose-500 bg-rose-50 shadow-sm outline-none"
                                                    : "border-gray-200 hover:border-gray-900"
                                                    }`}
                                            >
                                                <div className={`mb-auto ${isSelected ? "text-rose-500" : "text-gray-900"}`}>
                                                    <Icon size={32} />
                                                </div>
                                                <span className={`text-sm font-bold tracking-tight ${isSelected ? "text-rose-500" : "text-gray-900"}`}>
                                                    {cat.name}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* --- FOOTER (PROGRESS BAR) --- */}
            {isWizardStep && (
                <footer className="fixed bottom-0 left-0 w-full h-24 bg-white border-t border-gray-100 px-6 md:px-12 flex items-center justify-between z-50">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                        <motion.div
                            className="h-full bg-rose-500"
                            initial={{ width: "0%" }}
                            animate={{ width: step === "step1_intro" ? "6%" : "12%" }}
                        />
                    </div>

                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 text-sm font-bold underline text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-all"
                    >
                        <ChevronLeftIcon size={20} />
                        Atrás
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={step === "step1_categories" && !selectedCategory}
                        className={`px-8 py-3 bg-gray-900 text-white font-bold rounded-lg text-base transition-all ${(step === "step1_categories" && !selectedCategory) ? "opacity-50 cursor-not-allowed bg-gray-400" : "hover:scale-105 active:scale-95"
                            }`}
                    >
                        Siguiente
                    </button>
                </footer>
            )}
        </div>
    )

    function handleNext() {
        if (step === "step1_intro") setStep("step1_categories")
        // else if (step === "step1_categories") ... setStep("step1_location")
    }

    function handleBack() {
        if (step === "step1_intro") setStep("overview")
        if (step === "step1_categories") setStep("step1_intro")
    }
}

// Helper Sub-component
function StepItem({ number, title, text, icon, color }: { number: number, title: string, text: string, icon: any, color: "rose" | "blue" | "emerald" }) {
    const colorClasses = {
        rose: "bg-rose-50 text-rose-500",
        blue: "bg-blue-50 text-blue-500",
        emerald: "bg-emerald-50 text-emerald-500"
    }
    return (
        <div className="group flex items-center gap-6 p-6 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
            <div className="flex-shrink-0 w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-900 font-bold text-xl group-hover:scale-110 transition-transform">
                {number}
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">{text}</p>
            </div>
            <div className={`hidden sm:flex flex-shrink-0 w-24 h-24 ${colorClasses[color]} rounded-2xl items-center justify-center group-hover:rotate-6 transition-transform`}>
                {icon}
            </div>
        </div>
    )
}
