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

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password")
  res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("courses")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.deleteOne()
    res.json({
      message: "User Removed Successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.username = req.body.username || user.username
    user.isAdmin = req.body.isAdmin || user.isAdmin
    user.role = req.body.role || user.role

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

const addCourseToUser = asyncHandler(async (req, res) => {
  const { courseId } = req.body
  const user = await User.findById(req.params.id)
  const course = await Course.findById(courseId)

  if (!user) {
    res.status(404)
    throw new Error("User Not Found")
  }
  if (!course) {
    res.status(404)
    throw new Error("Course Not Found")
  }

  if (user.courses.includes(courseId)) {
    res.status(404)
    throw new Error("Course already added to user")
  }

  await User.updateOne(
    { $push: { courses: courseId } },
    { new: true }
  ).populate("courses")

  res.status(201).json({
    message: "Course added successfully",
    code: 201,
    success: true,
  })
})

export {
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  addCourseToUser,
}
