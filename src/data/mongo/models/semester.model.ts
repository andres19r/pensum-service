import mongoose, { Schema } from "mongoose";

const semesterSchema = new mongoose.Schema({
  num: {
    type: Number,
    unique: true,
    required: [true, "Semester number is required"],
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  pensum: {
    type: Schema.Types.ObjectId,
    ref: "Pensum",
  },
});

export const SemesterModel = mongoose.model("Semester", semesterSchema);
