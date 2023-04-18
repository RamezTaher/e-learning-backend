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

router.route("/").post(protect, admin, createSubject).get(protect, getSubjects)

router
  .route("/:id")
  .get(protect, getSubjectById)
  .delete(protect, admin, deleteSubject)
  .put(protect, admin, updateSubject)

export default router
