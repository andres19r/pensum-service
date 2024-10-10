import mongoose, { Schema } from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  state: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In progress", "Approved", "Reproved"],
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
