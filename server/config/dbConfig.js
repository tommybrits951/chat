require("dotenv").config()
const mongoose = require("mongoose")
const URI = process.env.MONGO_URI

async function connectDB() {
    await mongoose.connect(URI)
}

module.exports = connectDB