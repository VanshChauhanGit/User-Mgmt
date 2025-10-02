import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    father: { type: String, required: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // record belongs to a user
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);
