import express from "express"
import { protect } from "../middlewares/auth.middlewares.js"

import {
  addModuleToCourse,
  addQuizToCourse,
  addResponseToCourse,
  addTestToCourse,
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  removeModuleFromCourse,
  updateCourse,
} from "../controllers/course.controllers.js"
const router = express.Router()

router.route("/").post(protect, createCourse).get(protect, getCourses)

router
  .route("/:id")
  .get(protect, getCourseById)
  .delete(protect, deleteCourse)
  .put(protect, updateCourse)

router.route("/:courseId").patch(protect, addModuleToCourse)
router.route("/:courseId/:moduleId").patch(protect, removeModuleFromCourse)

router.route("/test/:courseId").put(protect, addTestToCourse)
router.route("/quiz/:courseId").put(protect, addQuizToCourse)
router.route("/submit/:courseId").put(protect, addResponseToCourse)
export default router
