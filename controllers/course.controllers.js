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

export { createCourse }
