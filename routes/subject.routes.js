import express from "express"
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjects,
  updateSubject,
} from "../controllers/subject.controllers.js"
import { admin, protect } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.route("/").post(protect, createSubject).get(protect, getSubjects)

router
  .route("/:id")
  .get(protect, getSubjectById)
  .delete(protect, deleteSubject)
  .put(protect, updateSubject)

export default router
