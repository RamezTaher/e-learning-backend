import mongoose from "mongoose"

const responseSchema = mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
)

const Response = mongoose.model("Response", responseSchema)

export default Response
