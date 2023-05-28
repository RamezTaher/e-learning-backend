import asyncHandler from "express-async-handler"
import Module from "../models/module.models.js"

const createModule = asyncHandler(async (req, res) => {
  const { title, lessons } = req.body

  const module = new Module({
    title,
    lessons,
  })

  const createdModule = await module.save()
  res.status(201).json(createdModule)
})

const getModules = asyncHandler(async (req, res) => {
  const modules = await Module.find()
  res.json(modules)
})

const getModuleById = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id)

  if (module) {
    res.json(module)
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

const updateModuleName = asyncHandler(async (req, res) => {
  const { title } = req.body
  const module = await Module.findById(req.params.id)

  if (module) {
    module.title = title

    await module.save()
    res.status(200).json({
      message: "Module Name Updated Successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

const deleteModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id)

  if (module) {
    await module.deleteOne()

    res.json({
      message: "Module Removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

const deleteModuleLesson = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.moduleId)

  if (module) {
    module.lessons = module.lessons.filter(
      (lesson) => lesson.id != req.params.lessonId
    )

    await module.save()
    res.json({
      message: "Lesson removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

const addModuleLesson = asyncHandler(async (req, res) => {
  const { title, content, videoUrl, duration, order } = req.body
  const module = await Module.findById(req.params.moduleId)

  if (module) {
    const newLesson = {
      title,
      content,
      videoUrl,
      duration,
      order,
    }

    module.lessons.push(newLesson)
    await module.save()

    res.status(201).json({
      message: "Lesson added successfully",
      code: 201,
      success: true,
      newLesson,
    })
  } else {
    res.status(404)
    throw new Error("Module not found")
  }
})

export {
  createModule,
  getModules,
  getModuleById,
  updateModuleName,
  deleteModule,
  deleteModuleLesson,
  addModuleLesson,
}
