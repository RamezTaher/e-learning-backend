import asyncHandler from "express-async-handler"
import Subject from "../models/subject.models.js"

const createSubject = asyncHandler(async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    description: req.body.description,
  })

  const createdSubject = await subject.save()
  res.status(201).json(createdSubject)
})

const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find()
  res.json(subjects)
})

const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  if (subject) {
    res.json(subject)
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  if (subject) {
    subject.name = req.body.name
    subject.description = req.body.description

    await subject.save()
    res.status(200).json({
      message: "Subject Updated Successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  if (subject) {
    await subject.deleteOne()
    res.json({
      message: "Subject Removed successfully",
      code: 200,
      success: true,
    })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

export {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
}
