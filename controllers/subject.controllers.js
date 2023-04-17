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

export { createSubject }
