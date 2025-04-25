const User = require("../models/User")
const bcrypt = require("bcrypt")
const fs = require("fs")
const fsPromises = require("fs/promises")
const path = require("path")

async function insertUser(req, res) {
    try {

        const { firstName, lastName, dob, email, password } = req.body
        const { img } = req.files
        const timeCreated = new Date().getTime()

        let contacts = []
        if (!firstName || !lastName || !dob || !email || !password) {
            return res.status(400).json({ message: "All fields required!" })
        }
        const hashed = bcrypt.hashSync(password, 10)
        const user = await User.create({ firstName, lastName, dob, email, password: hashed, contacts, images: [], profilePic: "" })

        const filePath = `${firstName}_${lastName}_${user._id}`
        const fileName = `${firstName}_${lastName}_${user._id}_${timeCreated}${path.extname(img.name)}`

        console.log(fileName)
        if (!fs.existsSync(path.join(__dirname, "..", "images", filePath))) {
            fsPromises.mkdir(path.join(__dirname, "..", "images", filePath))
        }
        fs.appendFileSync(path.join(__dirname, "..", "images", filePath, fileName), img.data)
        const imgResult = await User.findByIdAndUpdate(user._id, { ...user, profilePic: `${path.join(__dirname, "..", "images", filePath, fileName)}` })
        if (imgResult) {
            console.log("user updated!")
        }
        if (user) {
            res.status(201).json({ message: `User ${user.firstName} ${user.lastName} created!` })
        }
    } catch (err) {
        res.status(500).json({ message: err || "Problem with user!" })
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
module.exports = {
    insertUser,
    getUsers,
    getUserById
}