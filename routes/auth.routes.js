import express from 'express'
import { login, register } from '../controllers/auth.controllers.js'
const router = express.Router()

router.post('/login', login)
router.post('/register', register)


export default router


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication API
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: mypassword
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Some error happened
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: mypassword
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Some error happened
 */
