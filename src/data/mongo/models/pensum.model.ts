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
  subjects: [{
    type: Schema.Types.ObjectId,
    ref: "Subject",
  }]
})

export const PensumModel = mongoose.model("Pensum", pensumSchema)
