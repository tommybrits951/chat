const User = require("../models/User")



async function checkFields(req, res, next) {
    try {
        const { firstName, lastName, dob, email, postal, password } = req.body
        if (!firstName || !lastName || !dob || !email || !postal || !password) {
            return res.status(400).json({ message: "All fields required!" })
        }
        const zip = postal.split("")
        if (zip.length !== 5) {
            return res.status(400).json({ message: "Postal code must be 5 digits!" })
        }
        const duplicateEmail = await User.findOne({ email }).lean()
        if (duplicateEmail) {
            return res.status(400).json({ message: "Email already in use!" })
        }
        next()
    } catch (err) {
        res.status(500).json({ message: "Problem checking data!" })
    }
}
module.exports = checkFields