import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"
import {
  getUserById,
  getUserProfile,
  getUsers,
  updateUserProfile,
} from "../controllers/user.controllers.js"
const router = express.Router()

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route("/").get(protect, admin, getUsers)

router.route("/:id").get(protect, admin, getUserById)

export default router
