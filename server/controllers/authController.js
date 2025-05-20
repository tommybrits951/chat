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
        const user = await User.findOne({ email }).populate('contacts').exec()
        const changeStream = User.watch()
        changeStream.on("query", next => {
            console.log(next)
        })
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

async function authUser(req, res) {
    try {
        const token = req.headers.authorization
        const tmp = token.split(" ")[1]
        const decoded = jwt.verify(tmp, process.env.ACCESS)
        const user = await User.findById(decoded._id)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message || "Problem authorizing user!" })
    }
}

module.exports = {
    login,
    refreshHandle,
    authUser,
    buildToken
}