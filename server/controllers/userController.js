const User = require("../models/User")
const {format} = require("date-fns")
const bcrypt = require("bcrypt")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")

async function getAll(req, res, next) {
    try {
        const users = await User.getAllUsers()
        if (!users) {
            return res.status(400).json({message: "Didn't get users!"})
        }
        let results = []
        for (let i = 0; i < users.length; i++) {
            const {username, user_id, email} = users[i]
            results.push({username, user_id, email})
        }
        res.status(200).json(results)
    } catch (err) {
        next(err)
    }
}

async function getUser(req, res, next) {
    try {
        const {user_id} = req.params
        const user = await User.getUserById(user_id)
        
        
        const result = {...user, password: undefined, pic: user.image_path.split("/")[2]}
        
        res.json(result)
        
    } catch (err) {
        next(err)
    }
}


async function register(req, res, next) {
    try {
        const {username, password, email} = req.body;
        const {img} = req.files
        if (!username || !password || !email) {
            return res.status(400).json({message: "All fields required!"})
        }
        const duplicate = await User.getUserByUsername(username)
        const dupEmail = await User.getUserByEmail(email)
        if (duplicate) {
            return res.status(400).json({message: "Username already exists!"})
        } 
        if (dupEmail) {
            return res.status(400).json({message: "Email already exists!"})
        }
        if (img) {
            const dateTime = new Date().getTime()
            console.log(path.extname(img[0].name))
            const fileName = `${username}_${dateTime}${path.extname(img[0].name)}`
            console.log(fileName)
            if (!fs.existsSync(path.join(__dirname, "..", "images"))) {
               fsPromises.mkdir(path.join(__dirname, "..", "images"))
            }
            fsPromises.appendFile(path.join(__dirname, "..", "images", fileName), img[0].data)
           }
        const hash = await bcrypt.hash(password, 10)
        const joined = format(new Date(), "yyyy/MM/dd")
        const result = await User.insertUser({username, email, password: hash, joined})
        if (!result) {
            return res.status(400).json({message: "Error!"})
        }
        
            
        res.status(201).json({message: `User ${result.username} created!`})
    } catch (err) {
        next(err)
    }
}
async function removeUser(req, res, next) {
    try {
        const {id} = req.body;
        const result = await User.deleteUser(id)
        if (!result) {
            return res.status(500).json({message: "Error!"})
        }
        res.json({message: "User removed"})
    } catch (err) {
        next(err)
    }
}
module.exports = { 
    register,
    getAll,
    removeUser,
    getUser
}