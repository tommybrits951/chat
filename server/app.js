require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const PORT = process.env.PORT
const app = express()
const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use("/users", userRouter)
app.use("/auth", authRouter)




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})