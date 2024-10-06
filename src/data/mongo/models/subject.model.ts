import mongoose, { Schema } from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: [true, "Code is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  state: {
    type: String,
    default: "Not taken",
    enum: ["Not taken", "In progress", "Approved", "Reproved"],
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
  },
});

export const SubjectModel = mongoose.model("Subject", subjectSchema);
