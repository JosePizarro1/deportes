import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        await dbConnect();

        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json({ message: "El usuario ya existe" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "Error al registrar el usuario" }, { status: 500 });
    }
}
