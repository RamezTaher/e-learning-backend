import asyncHandler from "express-async-handler"
import Course from "../models/course.models.js"

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
  res.json(courses)
})

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
    .populate("instructor", "firstName lastName username")
    .populate("students", "firstName lastName username")
    .populate("modules")
    .populate("subject")

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

export { createCourse, getCourses, getCourseById, updateCourse, deleteCourse }
