import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"

import {
  addModuleToCourse,
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  removeModuleFromCourse,
  updateCourse,
} from "../controllers/course.controllers.js"
const router = express.Router()

router.route("/").post(protect, admin, createCourse).get(protect, getCourses)

router
  .route("/:id")
  .get(protect, getCourseById)
  .delete(protect, admin, deleteCourse)
  .put(protect, admin, updateCourse)

router.route("/:courseId").patch(protect, admin, addModuleToCourse)
router
  .route("/:courseId/:moduleId")
  .patch(protect, admin, removeModuleFromCourse)
export default router
