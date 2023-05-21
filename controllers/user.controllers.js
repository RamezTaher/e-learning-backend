import asyncHandler from "express-async-handler"
import User from "../models/user.models.js"
import Course from "../models/course.models.js"

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "courses",
    populate: [
      {
        path: "instructor",
        select: "firstName lastName username profileImage",
      },
      { path: "students", select: "firstName lastName username" },
      { path: "modules" },
    ],
  })

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      courses: user.courses,
      profileImage: user.profileImage,
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
    user.profileImage = req.body.profileImage || user.profileImage
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

const getTopStudents = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "student" })
    .select("-password")
    .limit(6)
  res.json(users)
})

const getAllStudents = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "student" }).select("-password")
  res.json(users)
})

const getAllInstructors = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "instructor" }).select("-password")
  res.json(users)
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate({
      path: "courses",
      populate: [
        { path: "instructor", select: "firstName lastName username" },
        { path: "students", select: "firstName lastName username" },
        { path: "modules" },
      ],
    })

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
    user.profileImage = req.body.profileImage || user.profileImage

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

  await User.updateOne({ _id: req.params.id }, { $push: { courses: courseId } })

  res.status(201).json({
    message: "Course added successfully",
    code: 201,
    success: true,
  })
})

const removeCourseFromUser = asyncHandler(async (req, res) => {
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

  if (!user.courses.includes(courseId)) {
    res.status(404)
    throw new Error("Course not found in user's courses")
  }

  await User.updateOne({ _id: req.params.id }, { $pull: { courses: courseId } })

  res.status(200).json({
    message: "Course removed successfully",
    code: 200,
    success: true,
  })
})

const enrollToCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body

  const user = await User.findById(req.user._id)
  const course = await Course.findById(courseId)

  if (!user) {
    res.status(404)
    throw new Error("User not found")
  }

  if (!course) {
    res.status(404)
    throw new Error("Course not found")
  }

  if (user.courses.includes(courseId)) {
    res.status(400)
    throw new Error("User already enrolled to this course")
  }

  await User.updateOne({ _id: req.user._id }, { $push: { courses: courseId } })
  res.status(200).json({
    message: "Enrolled to course successfully",
    code: 200,
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
  removeCourseFromUser,
  enrollToCourse,
  getTopStudents,
  getAllStudents,
  getAllInstructors,
}
