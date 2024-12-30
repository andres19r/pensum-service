import mongoose, { Schema } from "mongoose";

export enum SubjectState {
  Approved = "APPROVED",
  InProgress = "IN_PROGRESS",
  Pending = "PENDING",
  Reproved = "REPROVED",
}

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  state: {
    type: String,
    default: SubjectState.Pending,
    enum: SubjectState,
    required: true,
  },
  semester: {
    type: Number,
    required: [true, "Semester is required"],
  },
  score: {
    type: Number,
  },
  pensumId: {
    type: Schema.Types.ObjectId,
    ref: "Pensum",
  },
});

export const SubjectModel = mongoose.model("Subject", subjectSchema);

