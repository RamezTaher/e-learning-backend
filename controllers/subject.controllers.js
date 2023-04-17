import expressAsyncHandler from "express-async-handler"
import Subject from "../models/subject.models.js"

const createSubject = expressAsyncHandler(async (req, res) => {
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
    subject.name = name
    subject.description = description

    const updatedSubject = await subject.save()
    res.json(updatedSubject)
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  if (subject) {
    await Subject.remove()
    res.json({ message: "Subject removed" })
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
