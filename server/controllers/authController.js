const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

function buildToken(user, exp, secret) {
    const payload = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob
    }
    const options = {
        expiresIn: exp
    }
    return jwt.sign(payload, secret, options)
}
async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required!" })
        }

        const user = await User.findOne({ email }).exec()
        const verifiedPassword = bcrypt.compareSync(password, user.password)
        if (!user || !verifiedPassword) {
            return res.status(401).json({ message: "Email or Password incorrect!" })
        }
        const refreshToken = buildToken(user, "1d", process.env.REFRESH)

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        const accessToken = buildToken(user, "1h", process.env.ACCESS)
        res.json({ accessToken })
    } catch (err) {
        res.status(500).json({ message: "Failed to login!" })
    }
}
async function refreshHandle(req, res) {
    try {
        const cookie = req.cookies
        const token = cookie.jwt
        const decoded = jwt.verify(token, process.env.REFRESH)
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(401).json({ message: "Not Authorized!" })
        }
        const accessToken = buildToken(user, "1h", process.env.ACCESS)
        res.json({ accessToken })
    } catch (err) {
        res.status(401).json({ message: "Not Authorized!" })
    }
}
module.exports = {
    login,
    refreshHandle
}