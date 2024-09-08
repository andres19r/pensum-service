import mongoose, { Schema } from "mongoose";

const pensumSchema = new mongoose.Schema({
  career: {
    type: String,
    required: [true, "Career is required"]
  },
  university: {
    type: String,
    required: [true, "University is required"]
  },
  semesters: [{
    type: Schema.Types.ObjectId,
    ref: "Semester",
  }]
})

pensumSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

export const PensumModel = mongoose.model("Pensum", pensumSchema)
