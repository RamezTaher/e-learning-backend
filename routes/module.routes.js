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

router.route("/").get(protect, getModules).post(protect, createModule)

router
  .route("/:id")
  .get(protect, getModuleById)
  .patch(protect, updateModuleName)
  .delete(protect, deleteModule)

router.route("/:moduleId/lesson/:lessonId").delete(protect, deleteModuleLesson)

router.route("/:moduleId/lesson").post(protect, addModuleLesson)

export default router
