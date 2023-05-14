import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"

import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "../controllers/course.controllers.js"
const router = express.Router()

router.route("/").post(protect, admin, createCourse).get(protect, getCourses)

router
  .route("/:id")
  .get(protect, getCourseById)
  .delete(protect, admin, deleteCourse)
  .put(protect, admin, updateCourse)

export default router
