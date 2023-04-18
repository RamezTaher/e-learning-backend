import mongoose from "mongoose"

const progressSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    progress: {
      type: Number,
      min: 0,
      max: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Progress = mongoose.model("Progress", progressSchema)

export default Progress
