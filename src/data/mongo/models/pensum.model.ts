import mongoose, { Schema } from "mongoose";

const pensumSchema = new mongoose.Schema({
  career: {
    type: String,
    unique: true,
    required: [true, "Career is required"]
  },
  university: {
    type: String,
    unique: true,
    required: [true, "University is required"]
  },
  semesters: [{
    type: Schema.Types.ObjectId,
    ref: "Semester",
  }]
})

export const PensumModel = mongoose.model("Pensum", pensumSchema)
