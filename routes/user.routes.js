import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"
import {
  addCourseToUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
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
  .put(protect, admin, addCourseToUser)

export default router
