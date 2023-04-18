import express from "express"
import { login, register, status } from "../controllers/auth.controllers.js"
import { protect } from "../middlewares/auth.middlewares.js"
const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.get("/me", protect, status)

export default router
