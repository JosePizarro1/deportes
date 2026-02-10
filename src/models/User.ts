import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es obligatorio"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Por favor, introduce un email válido",
        ],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        select: false, // Don't return password by default
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "host"],
        default: "user",
    },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
