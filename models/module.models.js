import mongoose from "mongoose"

const moduleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lessons: {
      type: [
        {
          id: { type: Number },
          title: { type: String },
          content: { type: String },
          videoUrl: { type: String },
          duration: { type: Number },
        },
      ],
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

const Module = mongoose.model("Module", moduleSchema)

export default Module
