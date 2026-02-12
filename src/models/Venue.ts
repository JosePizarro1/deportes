import { Schema, model, models, Document } from "mongoose";

export interface IVenue extends Document {
    name: string;
    description: string;
    address: string;
    location: {
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
    };
    pricePerHour: number;
    images: string[];
    sports: string[];
    amenities: string[];
    rating: number;
    reviewsCount: number;
    ownerId?: Schema.Types.ObjectId;
}

const VenueSchema = new Schema<IVenue>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        address: { type: String, required: true },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        pricePerHour: { type: Number, required: true },
        images: { type: [String], default: [] },
        sports: { type: [String], default: [] },
        amenities: { type: [String], default: [] },
        rating: { type: Number, default: 0 },
        reviewsCount: { type: Number, default: 0 },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

// Index for geoqueries
VenueSchema.index({ location: "2dsphere" });

const Venue = models.Venue || model<IVenue>("Venue", VenueSchema);
export default Venue;
