const mongoose = require("mongoose") 

const boardSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    postCount: {
        type: Number,
        default: 0
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})



module.exports = new mongoose.model("Board", boardSchema)