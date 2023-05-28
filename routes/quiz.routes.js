import express from "express"
import { admin, protect } from "../middlewares/auth.middlewares.js"
import {
  addQuestionToQuiz,
  getQuizById,
  getQuizs,
  removeQuestionFromQuiz,
} from "../controllers/quiz.controllers.js"

const router = express.Router()

router.route("/").get(protect, getQuizs)

router.route("/:id").get(protect, getQuizById)

router
  .route("/:quizId/question/:questionId")
  .delete(protect, removeQuestionFromQuiz)

router.route("/:quizId/question").patch(protect, addQuestionToQuiz)

export default router
