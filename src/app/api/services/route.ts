import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ name: 1 });
        return NextResponse.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Error de servidor al obtener categorías" }, { status: 500 });
    }
}
