import mongoose from "mongoose"

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg",
    },
  },
  {
    timestamps: true,
  }
)

const Subject = mongoose.model("Subject", subjectSchema)

export default Subject
