const Friends = require("../models/Friends")


async function getFriends(req, res, next) {
    try {
        const {user_id} = req.params;
        const friends = await Friends.getFriends(user_id)
        if (!friends) {
            return res.status(500).json({message: "Couldn't get friends!"})
        }
        res.status(200).json(friends)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getFriends
}