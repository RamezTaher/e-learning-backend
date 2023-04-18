import express from "express"
import { protect, admin } from "../middlewares/auth.middlewares.js"
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controllers.js"
const router = express.Router()

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
