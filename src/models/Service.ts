import { Schema, model, models, Document } from "mongoose";

export interface IService extends Document {
    name: string;
    icon: string; // Name of the react-icon (e.g., 'BiSoccer')
    description: string;
}

const ServiceSchema = new Schema<IService>(
    {
        name: { type: String, required: true, unique: true },
        icon: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const Service = models.Service || model<IService>("Service", ServiceSchema);
export default Service;
