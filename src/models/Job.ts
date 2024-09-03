import { model, Schema, Types } from "mongoose";
import { IJob } from "../types/job";

const JobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, "Please provide comapny name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 200,
    },
    status: {
      type: String,
      required: true,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Types.ObjectId,
      required: [true, "Please provide user"],
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model("Job", JobSchema);
