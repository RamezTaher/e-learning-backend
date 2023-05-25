import mongoose from "mongoose"
const { Schema } = mongoose

const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
})

const quizSchema = new Schema({
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
})

const Question = mongoose.model("Question", questionSchema)
const Quiz = mongoose.model("Quiz", quizSchema)

export { Question, Quiz }
