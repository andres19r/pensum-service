import mongoose, { Schema } from "mongoose";
import { SubjectModel } from "./subject.model";

const pensumSchema = new mongoose.Schema({
  career: {
    type: String,
    unique: true,
    required: [true, "Career is required"],
  },
  university: {
    type: String,
    required: [true, "University is required"],
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

pensumSchema.pre("findOneAndDelete", async function () {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await SubjectModel.deleteMany({ pensumId: doc._id });
  }
});

export const PensumModel = mongoose.model("Pensum", pensumSchema);
