const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    dob: {
        required: true,
        type: Date
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    postal: {
        type: Number,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    contacts: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    images: [{
        type: String
    }],
    profilePic: {
        type: String,
        default: "/default/account.png"
    },

    joined: {
        type: Date,
        required: true
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    refreshToken: String
})

module.exports = mongoose.model("User", userSchema)