import express from "express"
import { admin, protect } from "../middlewares/auth.middlewares.js"
import {
  addModuleLesson,
  createModule,
  deleteModule,
  deleteModuleLesson,
  getModuleById,
  getModules,
  updateModuleName,
} from "../controllers/module.controllers.js"

const router = express.Router()

router.route("/").get(protect, getModules).post(protect, admin, createModule)

router
  .route("/:id")
  .get(protect, getModuleById)
  .put(protect, admin, updateModuleName)
  .delete(protect, admin, deleteModule)

router
  .route("/:moduleId/lesson/:lessonId")
  .delete(protect, admin, deleteModuleLesson)

router.route("/:moduleId/lesson").put(protect, admin, addModuleLesson)

export default router
