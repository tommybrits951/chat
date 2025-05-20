const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        time: {
            type: Date,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        likes: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }]
}, {
    timestamps: true
})

const postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    comments: [commentSchema]
}, {
    timestamps: true
})


module.exports = new mongoose.model("Post", postSchema)