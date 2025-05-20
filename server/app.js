require("dotenv").config()
const {Server} = require("socket.io")
const express = require("express")
const mongoose = require("mongoose")
const http = require("http")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/dbConfig")
const PORT = process.env.PORT
const fileUpload = require("express-fileupload")
connectDB()


const app = express()
const server = http.createServer(app)



const io = new Server(server, {
    cors: {
        credentials: true,
        origin: "http://localhost:5173"
    }
})

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
app.use("/board", require("./routes/boardRoutes"))
app.use("/post", require("./routes/postRoutes"))
app.use("/image", express.static("images"))



io.on("connection", socket => {
    console.log('user connected to IO')
    socket.emit('greeting', "Welcome")
})

mongoose.connection.once("open", () => {
    server.listen(PORT, () => {
        console.log("listening on port 9000")
    })
})
