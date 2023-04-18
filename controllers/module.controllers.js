import asyncHandler from "express-async-handler"
import Module from "../models/module.models"

const createModule = asyncHandler(async (req, res) => {
  const { title, lessons } = req.body

  if (lessons && lessons.length === 0) {
    res.status(400)
    throw new Error("No Lessons Provided")
  } else {
    const module = new Module({
      title,
      lessons,
    })

    const createdModule = await module.save()
    res.status(201).json(createdModule)
  }
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
  const module = await Subject.findById(req.params.id)

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
    await module.remove()
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
      (lesson) => lesson._id != req.params.lessonId
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
  const { title, content, videoUrl, duration } = req.body
  const module = await Module.findById(req.params.moduleId)

  if (module) {
    const newLesson = {
      id,
      title,
      content,
      videoUrl,
      duration,
    }
    await module.updateOne({ $push: { lessons: newLesson } })

    res.status(201).json({
      message: "Lesson added successfully",
      code: 201,
      success: true,
      module,
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
