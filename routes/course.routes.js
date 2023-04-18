import express from "express"

import { protect, admin } from "../middlewares/auth.middlewares.js"
import { createCourse } from "../controllers/course.controllers.js"
const router = express.Router()

router.route("/").post(protect, admin, createCourse)

export default router
