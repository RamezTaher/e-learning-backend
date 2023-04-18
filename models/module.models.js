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
          id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
          },
          _id: false,
          title: { type: String },
          content: { type: String },
          videoUrl: { type: String },
          duration: { type: Number },
          order: { type: Number, required: true },
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
