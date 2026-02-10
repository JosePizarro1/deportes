"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })

            if (res?.error) {
                setError("Email o contraseña incorrectos")
            } else {
                router.push("/")
                router.refresh()
            }
        } catch (error) {
            console.error("Login error:", error)
            setError("Error de conexión")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-12">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Bienvenido</h1>
                        <p className="text-gray-400">Inicia sesión en SportBnB</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                                placeholder="tu@email.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && <p className="text-rose-500 text-sm font-medium">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 text-lg font-bold bg-rose-600 hover:bg-rose-700 shadow-xl shadow-rose-600/20"
                        >
                            {loading ? "Iniciando..." : "Iniciar Sesión"}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-400 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="text-rose-400 font-bold hover:underline italic">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
