import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { notFound, errorHandler } from "./middlewares/error.middlewares.js"
import connectDB from "./config/db.js"
import helmet from "helmet"
import cors from "cors"
import compression from 'compression'


const app = express()


// Import Routes
import authRoutes from './routes/auth.routes.js'


dotenv.config()
connectDB()


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})


// Middlewares
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(helmet())
app.use(compression());



// Implement Endpoints
app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to my E-Learning API")
})

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)