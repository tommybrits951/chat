const User = require("../models/User")
const bcrypt = require("bcrypt")
const fs = require("fs")
const fsPromises = require("fs/promises")
const path = require("path")
const { v4: uuidv4 } = require("uuid")
async function insertUser(req, res) {
    try {
        //All data fields are checked by middleware
        const { firstName, profilePic, imageId, lastName, dob, email, password, postal } = req.body

        //contacts array for database       
        let contacts = []

        //Hashed Password for Security then create the model to save to mongodb.
        const hashed = bcrypt.hashSync(password, 10)

        const joined = new Date().getTime()

        const user = await User.create({ firstName, lastName, imageId, dob, email, postal, contacts, profilePic, password: hashed, joined })


        if (user) {
            res.status(201).json({ message: `User ${user.firstName} ${user.lastName} created!` })
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "Problem with user!" })
    }
}
async function getUsers(req, res) {
    try {
        const users = await User.find().lean().exec()
        res.json(users).status(200)
    } catch (err) {
        res.status(500).json({ message: "Problem getting user list!" })
    }
}
async function getUserById(req, res) {
    try {
        const { _id } = req.params
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).json({ message: "Could not find user!" })
        }
    } catch (err) {
        res.status(500).json({ message: "Problem getting user!" })
    }
}

async function changeProfilePic(req, res, next) {
    try {
        const { _id } = req.body
        const { img } = req.files
        const user = await User.findById(_id)
        const { imageId, firstName, lastName } = user
        const filePath = `${firstName}_${lastName}_${imageId}`
        const fileName = `${fistName}_${lastName}_${imageId}_profile.jpg`
        if (!fs.existsSync(path.join(__dirname, "..", "images", filePath))) {
            fsPromises.mkdir(path.join(__dirname, "..", "images", filePath))
        }
        fsPromises.appendFile(path.join(__dirname, "..", "images", filePath, fileName), img.data)
        res.status(201).json({ message: "Profile Pic Updated" })
    } catch (err) {
        res.status(500).json({ message: err.message || "problem updating profile pic." })
    }
}

module.exports = {
    insertUser,
    getUsers,
    getUserById,
    changeProfilePic
}