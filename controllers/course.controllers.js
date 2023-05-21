import asyncHandler from "express-async-handler"
import Course from "../models/course.models.js"
import Module from "../models/module.models.js"
import Response from "../models/response.model.js"

const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body)

  if (course) {
    res.status(201).json(course)
  } else {
    res.status(400)
    throw new Error("Invalid Course Data")
  }
})

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate("instructor", "profileImage firstName lastName")
    .sort({ order: 1 })
  res.json(courses)
})

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("instructor", "firstName lastName username profileImage")
    .populate("students", "firstName lastName username profileImage")
    .populate("modules")
    .populate("subject")
    .populate("responses")

  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    course.title = req.body.title || course.title
    course.description = req.body.description || course.description
    course.image = req.body.image || course.image
    course.level = req.body.level || course.level
    course.startDate = req.body.startDate || course.startDate
    course.duration = req.body.duration || course.duration

    await course.save()
    res.status(200).json({
      message: "Course Updated Successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)

  if (course) {
    await course.deleteOne()
    res.json({
      message: "Course Removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

const addModuleToCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (course) {
    const module = new Module({
      title: req.body.title,
      lessons: req.body.lessons,
    })

    const createdModule = await module.save()
    course.modules.push(createdModule)
    await course.save()

    res.status(201).json({
      message: "Module added successfully",
      code: 201,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})
const addResponseToCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (course) {
    const response = new Response({
      link: req.body.link,
      student: req.body.student,
    })

    const createdResponse = await response.save()
    course.responses.push(createdResponse)
    await course.save()

    res.status(201).json({
      message: "Response added successfully",
      code: 201,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})
const addTestToCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (course) {
    course.test = req.body.test
    console.log(req.body.test)

    await course.save()
    res.status(200).json({
      message: "Test Added Successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

const removeModuleFromCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId)

  if (course) {
    course.modules = course.modules.filter(
      (module) => module._id != req.params.moduleId
    )

    await course.save()
    res.json({
      message: "Module removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

export {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  addModuleToCourse,
  removeModuleFromCourse,
  addTestToCourse,
  addResponseToCourse,
}
