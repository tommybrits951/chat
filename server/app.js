require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/dbConfig")
const PORT = process.env.PORT
const app = express()
const fileUpload = require("express-fileupload")
connectDB()

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(fileUpload())
app.use(express.json())
app.use(cookieParser())
app.use("/users", require("./routes/userRoutes"))
app.use("/auth", require("./routes/authRoutes"))
app.use("/message", require("./routes/messageRoutes"))




mongoose.connection.on("open", () => {
    console.log("connected to db")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
