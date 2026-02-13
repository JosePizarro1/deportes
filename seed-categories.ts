import dbConnect from "./src/lib/db";
import Service from "./src/models/Service";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CATEGORIES = [
    { name: "Cancha", icon: "BiSoccer", description: "Espacios abiertos o techados para deportes de equipo." },
    { name: "Gimnasio", icon: "BiCycling", description: "Centros de entrenamiento y acondicionamiento físico." },
    { name: "Centro Recreativo", icon: "BiSun", description: "Espacios sociales con múltiples opciones deportivas." },
    { name: "Piscina", icon: "BiSwim", description: "Instalaciones acuáticas para natación y recreación." },
    { name: "Pista", icon: "BiRun", description: "Circuitos para atletismo, patinaje o ciclismo." },
    { name: "Estadio", icon: "BiBuilding", description: "Grandes recintos para eventos deportivos masivos." },
];

async function seedCategories() {
    try {
        await dbConnect();

        // Clear existing categories
        await Service.deleteMany({});

        // Insert new categories
        await Service.insertMany(CATEGORIES);

        console.log("✅ Categories seeded successfully");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding categories:", error);
        process.exit(1);
    }
}

seedCategories();
