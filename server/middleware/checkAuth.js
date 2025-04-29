const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function checkAuth(req, res, next) {
    try {
        const bearer = req.headers.authorization
        const token = bearer.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS)
        const user = await User.findById(decoded._id)
        if (!user) {
            return res.status(401).json({ message: "Not Authorized!" })
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = checkAuth