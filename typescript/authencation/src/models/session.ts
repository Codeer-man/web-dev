import mongoose from "mongoose";
import { string } from "zod";

export interface SessionDoc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiredAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDoc>({
  userId: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now() },
  expiredAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

const Session = mongoose.model<SessionDoc>("Session", sessionSchema);
export default Session;
