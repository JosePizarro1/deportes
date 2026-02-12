import { Schema, model, models, Document } from "mongoose";

export interface IAvailability extends Document {
    venueId: Schema.Types.ObjectId;
    dayOfWeek?: number; // 0-6 (Sunday to Saturday) for recurring slots
    date?: Date; // For specific dates
    startTime: string; // "HH:mm" format, e.g., "08:00"
    endTime: string; // "HH:mm" format, e.g., "10:00"
    isBooked: boolean;
    bookingId?: Schema.Types.ObjectId;
}

const AvailabilitySchema = new Schema<IAvailability>(
    {
        venueId: { type: Schema.Types.ObjectId, ref: "Venue", required: true },
        dayOfWeek: { type: Number, min: 0, max: 6 },
        date: { type: Date },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, default: false },
        bookingId: { type: Schema.Types.ObjectId, ref: "Booking" },
    },
    { timestamps: true }
);

const Availability = models.Availability || model<IAvailability>("Availability", AvailabilitySchema);
export default Availability;
