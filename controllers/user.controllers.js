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

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.username = req.body.username || user.username
    if (req.body.password) {
      user.password = req.body.password
    }

    await user.save()

    res.json({
      message: "User Profile Updated successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { getUserProfile, updateUserProfile }
