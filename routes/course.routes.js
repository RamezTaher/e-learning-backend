import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"

import {
  addModuleToCourse,
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

router.route("/test/:courseId").put(protect, admin, addTestToCourse)
router.route("/submit/:courseId").put(protect, addResponseToCourse)
export default router
