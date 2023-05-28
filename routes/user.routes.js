import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"
import {
  addCourseToUser,
  deleteUser,
  enrollToCourse,
  getAllInstructors,
  getAllStudents,
  getTopStudents,
  getUserById,
  getUserProfile,
  getUsers,
  removeCourseFromUser,
  updateUser,
  updateUserProfile,
} from "../controllers/user.controllers.js"
const router = express.Router()

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)

router.route("/").get(protect, getUsers)

router.route("/top").get(protect, getTopStudents)
router.route("/students").get(protect, getAllStudents)
router.route("/instructors").get(protect, getAllInstructors)

router
  .route("/:id")
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .patch(protect, updateUser)

router
  .route("/:id/course")
  .patch(protect, removeCourseFromUser)
  .put(protect, addCourseToUser)

router.route("/enroll").put(protect, enrollToCourse)

export default router
