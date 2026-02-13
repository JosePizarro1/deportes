"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { HiEye, HiEyeOff } from "react-icons/hi"

// Fix for react-icons type errors
const GoogleIcon = FcGoogle as any
const EyeIcon = HiEye as any
const EyeOffIcon = HiEyeOff as any

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
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
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Inicia sesión</h1>
                        <p className="text-gray-500">Bienvenido de nuevo a SportBnB</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400"
                                placeholder="tu@email.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all placeholder:text-gray-400 pr-12"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-rose-500 text-sm font-medium">{error}</p>}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-6 text-lg font-bold bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-lg shadow-rose-200"
                        >
                            {loading ? "Iniciando..." : "Iniciar Sesión"}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">O también</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all"
                        >
                            <GoogleIcon className="text-2xl" />
                            Continúa con Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-gray-600 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link href="/register" className="text-rose-500 font-bold hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
