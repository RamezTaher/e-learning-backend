import express from "express"
import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "../controllers/subject.controllers.js"
import { admin, protect } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router
  .route("/")
  .post(protect, admin, createSubject)
  .get(protect, createSubject)

router
  .route("/:id")
  .get(protect, createSubject)
  .delete(protect, admin, deleteSubject)
  .put(protect, admin, updateSubject)

export default router
