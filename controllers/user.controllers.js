import asyncHandler from "express-async-handler"
import User from "../models/user.models.js"
import Course from "../models/course.models.js"

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("courses")

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      courses: user.courses,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { getUserProfile }
