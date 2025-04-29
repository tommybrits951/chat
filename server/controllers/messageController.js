const Message = require("../models/Message")
const User = require("../models/User")
const jwt = require("jsonwebtoken")



async function insertMessage(req, res) {
    try {
        const { sender, recipient, message } = req.body
        const timeSent = new Date().getTime()
        if (!sender) {
            return res.status(400).json({ message: "No Sender!" })
        } else if (!recipient) {
            return res.status(400).json({ message: "No Recipient!" })
        } else if (!message) {
            return res.status(400).json({ message: "No Message!" })
        }
        const verifySender = await User.findById(sender)
        const verifyRecipient = await User.findById(recipient)
        if (!verifyRecipient || !verifySender) {
            return res.status(400).json({ message: "The recipient account or your account can't be found!" })
        }
        const response = await Message.create({ sender, recipient, message, timeSent })
        if (response) {
            res.status(201).json({ message: "Message sent!", data: response })
        }
    } catch (err) {
        res.status(500).json({ message: "Problem sending message!" })
    }
}

async function getChat(req, res) {
    try {

        const auth = req.headers.authorization
        const token = auth.split(' ')[1]
        const { _id } = jwt.verify(token, process.env.ACCESS)
        const user = await User.findById(_id)
        const received = await Message.find({ recipient: user._id }).populate("sender").populate("recipient")
        const sent = await Message.find({ sender: user._id }).populate('recipient').populate("sender")
        let messages = [...received]
        sent.map(mess => {
            messages = [...messages, mess]
        })
        messages.sort(function (a, b) {
            return b.timeSent - a.timeSent
        })
        console.log(messages)

        res.status(200).json(messages)

    } catch (err) {
        res.status(500).json({ message: "Problem getting message!" })
    }
}


module.exports = {
    insertMessage,
    getChat
}