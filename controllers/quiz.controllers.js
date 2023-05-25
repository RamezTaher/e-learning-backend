import asyncHandler from "express-async-handler"
import { Quiz } from "../models/quiz.models.js"
import { Question } from "../models/quiz.models.js"

const removeQuestionFromQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId)

  if (quiz) {
    quiz.questions = quiz.questions.filter(
      (question) => question.id != req.params.questionId
    )
    const question = Question.findById(req.params.questionId)
    if (question) {
      await question.deleteOne()
    }

    await quiz.save()
    res.json({
      message: "Question removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Quiz not found")
  }
})

const addQuestionToQuiz = asyncHandler(async (req, res) => {
  const { question, answers, correctAnswer } = req.body
  const quiz = await Quiz.findById(req.params.quizId)

  if (quiz) {
    const newQuestion = new Question({ question, answers, correctAnswer })
    const createdQuestion = await newQuestion.save()
    await Quiz.updateOne({ $push: { questions: createdQuestion._id } })

    res.status(201).json({
      message: "Question  added successfully",
      code: 201,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

const getQuizs = asyncHandler(async (req, res) => {
  const quizs = await Quiz.find()
  res.json(quizs)
})

const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("questions")

  if (quiz) {
    res.json(quiz)
  } else {
    res.status(404)
    throw new Error("Quiz not found")
  }
})

export { addQuestionToQuiz, removeQuestionFromQuiz, getQuizs, getQuizById }
