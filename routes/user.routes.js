import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"
import {
  addCourseToUser,
  deleteUser,
  enrollToCourse,
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

router.route("/").get(protect, admin, getUsers)

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .patch(protect, admin, updateUser)

router
  .route("/:id/course")
  .delete(protect, admin, removeCourseFromUser)
  .put(protect, admin, addCourseToUser)

router.route("/enroll").put(protect, enrollToCourse)

export default router
