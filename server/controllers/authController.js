require("dotenv").config()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

function buildAccess(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: "1h"
    }
    return jwt.sign(payload, process.env.ACCESS_SECRET, options)
}

function buildRefresh(user) {
    const payload = {
        subject: user.user_id,
        username: user.username,
        email: user.email
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, process.env.REFRESH_SECRET, options)
}
async function login(req, res) {
    try {
        const {email, password} = req.body;
        console.log(email, password)
        if (!email || !password) {
            res.status(400).json({message: "All fields required!"})
        }
        const user = await User.getUserByEmail(email)
        const match = await bcrypt.compare(password, user.password)
        if (!match || !user) {
            return res.status(401).json({message: "Unauthorized!"})
        }
        const accessToken = buildAccess(user)
        const refreshToken = buildRefresh(user)
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({accessToken})
    } catch (err) {
        res.status(500).json({message: "Error!"})
    }
}


async function authRefresh(req, res) {
    try {
        const cookie = req.cookies.jwt
        if (!cookie) {
            return res.status(401).json({message: "Not authorized"})
        }
        const bearer = req.headers.authorization
        const token = bearer.split(" ")[1]
        console.log(token)
        const decoded = await jwt.verify(cookie, process.env.REFRESH_SECRET)
        const current = Math.floor(new Date().getTime() * 0.001)
        if (current >= decoded.exp) {
            res.status(401).json({message: "You have been signed out!"})
        } 
        if (current < decoded.exp) {
            const accessToken = buildAccess(decoded)
            res.status(200).json(accessToken)
        }
    } catch (err) {
        res.status(500).json({message: "Error!"})
    }
}

module.exports = {
    login,
    authRefresh
}