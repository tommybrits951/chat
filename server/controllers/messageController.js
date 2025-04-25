const Message = require("../models/Message")


async function sendMessage(req, res) {
    try {
        const { sender, recipient, message } = req.body
        if (!sender || !recipient || !message) {
            return res.status(400).json({ message: "All fields required!" })
        }
        const timeSent = new Date().getTime()
        const response = await Message.create({ sender, recipient, message, timeSent })
        if (response) {
            res.json({ response })
        }
    } catch (err) {
        res.status(500).json({ message: err.message || "Could not get chats!" })
    }
}
async function getChats(req, res) {
    try {
        const { _id } = req.params
        const sent = await Message.find({ sender: _id }).exec()
        const received = await Message.find({ recipient: _id }).exec()
        let messages = []
        sent.map(mes => {
            messages = [...messages, mes]
        })
        received.map(mes => {
            messages = [...messages, mes]
        })
        messages = messages.sort((a, b) => a < b)
        console.log(messages)
    } catch (err) {
        res.status(500).json({ message: err.message || "Could not get chats!" })
    }
}
module.exports = {
    sendMessage,
    getChats
}