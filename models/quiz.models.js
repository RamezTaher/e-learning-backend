import mongoose from "mongoose"
const { Schema } = mongoose

const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
})

const quizSchema = new Schema({
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
})

const Question = mongoose.model("Question", questionSchema)
const Quiz = mongoose.model("Quiz", quizSchema)

export { Question, Quiz }
