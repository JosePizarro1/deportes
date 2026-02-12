import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ status: "ok", db: "connected" }, { status: 200 });
  } catch (err) {
    console.error("DB health check error:", err);
    return NextResponse.json(
      { status: "error", message: "unable to connect to database" },
      { status: 500 }
    );
  }
}
