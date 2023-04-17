import express from "express"
import { createSubject } from "../controllers/subject.controllers.js"
import { admin, protect } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.route("/").post(protect, admin, createSubject)

export default router
