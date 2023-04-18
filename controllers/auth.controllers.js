import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/user.models.js"

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body

  const userExists = await User.findOne({ email, username })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists with this email or username")
  }

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const status = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
    } else {
      const { password, ...userInfo } = req.user._doc
      return res.json(userInfo)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
})

export { login, register, status }
