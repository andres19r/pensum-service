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

semesterSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const SemesterModel = mongoose.model("Semester", semesterSchema);
