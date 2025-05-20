const User = require("../models/User")
const bcrypt = require("bcrypt")
const fs = require("fs")
const fsPromises = require("fs/promises")
const path = require("path")
const sharp = require("sharp")
const jwt = require("jsonwebtoken")

async function createOutput(data) {
    console.log(data)
    await fsPromises.writeFile(path.join(__dirname, "output.png"), data)
}

async function extractImage(left, top, width, height, _id) {
    const output = path.join(__dirname, "output.png")

    const tmp = await sharp(output).extract({ left: parseInt(left), top: parseInt(top), width: parseInt(width), height: parseInt(height) }).toBuffer()
    return tmp
}


async function uploadProfilePic(x, y, width, height, _id) {

    try {
        console.log(x, y)
        const tmp = await extractImage(parseInt(x), parseInt(y), parseInt(width), parseInt(height), _id)
        if (!fs.existsSync(path.join(__dirname, "..", "images", "profile", `${_id}.png`))) {

            await fsPromises.appendFile(path.join(__dirname, "..", "images", "profile", `${_id}.png`), tmp)
        } else {
            await fsPromises.writeFile(path.join(__dirname, "..", "images", "profile", `${_id}.png`), tmp)
        }
        const user = await User.findByIdAndUpdate(_id, { profilePic: `${_id}.png` })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function insertUser(req, res) {
    try {
        const { img } = req.files
        const { firstName, lastName, dob, email, password, postal, x, y, width, height } = req.body
        const hashed = bcrypt.hashSync(password, 10)
        const joined = new Date().getTime()
        const contacts = []
        const user = await User.create({ firstName, lastName, dob, email, postal, contacts, password: hashed, joined })
        await createOutput(img.data)
        await uploadProfilePic(x, y, width, height, user._id)
        res.status(201).json({ message: `User ${user.firstName} ${user.lastName} created!`, user: { ...user._doc, password: undefined } })
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
        const fileName = `${firstName}_${lastName}_${imageId}_profile.jpg`
        if (!fs.existsSync(path.join(__dirname, "..", "images", filePath))) {
            fsPromises.mkdir(path.join(__dirname, "..", "images", filePath))
        }
        fsPromises.appendFile(path.join(__dirname, "..", "images", filePath, fileName), img.data)
        res.status(201).json({ message: "Profile Pic Updated" })
    } catch (err) {
        res.status(500).json({ message: err.message || "problem updating profile pic." })
    }
}


async function addFriend(req, res) {
    try {
        const bearer = req.headers.authorization
        const auth = bearer.split(" ")[1]
        const decoded = jwt.decode(auth, process.env.ACCESS)
        
        const { person } = req.body

        const user = await User.findById(decoded._id)
        const {contacts} = user;
        
        const updatedContacts = [...contacts, String(person)]
        const result = await User.findByIdAndUpdate(user._id, {contacts: updatedContacts})
        const obj = {...result._doc, password: undefined}
        console.log(obj)
        if (result) {
            return res.status(200).json(obj)
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "problem adding friend." })
    }
}


module.exports = {
    insertUser,
    getUsers,
    getUserById,
    changeProfilePic,
    addFriend
}