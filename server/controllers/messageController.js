const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Message = require("../models/Message")
const {format} = require("date-fns") 
async function insertMessage(req, res) {
    try {
        const { senderId, recipientId, message} = req.body
        console.log(senderId, recipientId)
        if (!senderId || !recipientId || !message) {
            return res.status(400).json({message: "All fields required!"})
        }
        
        const timeSent = new Date().getTime()
        const result = await Message.create({sender:  senderId, recipient: recipientId, message: message, timeSent})
        console.log(result)
        res.json(result) 

        
    } catch (err) {
        res.status(500).json({message: "Problem inserting message!"})
    }
}
async function getChat(req, res) {
    try {
        const {_id} = req.params
        const token = req.headers.authorization
        const auth = token.split(" ")[1]
        const decoded = jwt.decode(auth, process.env.ACCESS)
        const contact = await User.findById(_id)
        const user = await User.findById(decoded._id)
        const sent = await Message.find({sender: user._id, recipient: _id})
        const received = await Message.find({sender: contact._id, recipient: user._id})
        let arr = [...sent, ...received]
        arr.sort((a, b) => a.timeSent - b.timeSent)

        res.json(arr)
    } catch (err) {
        res.status(500).json({message: "Problem getting chat!"})
    }
}



async function getAllChats(req, res) {
    try {
        const bearer = req.headers.authorization
        const token = bearer.split(' ')[1]
        const decoded = jwt.decode(token, process.env.ACCESS)
        const sent = await Message.find({sender: decoded._id}).populate("recipient")
        const received = await Message.find({recipient: decoded._id}).populate('sender')
        sent.sort((a, b) => a.timeSent - b.timeSent)
        received.sort((a, b) => a.timeSent - b.timeSent)
        let chats = []
        let arr = []
        sent.map(mes => {
            if (!arr.includes(String(mes.recipient._id))) {
                arr.push(String(mes.recipient._id))
                const {_id, firstName, lastName, profilePic} = mes.recipient
                const obj = {_id, firstName, lastName, profilePic, message: mes.message, sender: decoded._id, time: format(new Date(mes.timeSent).getTime(), "hh:mm aaa")}
                chats.push(obj)
            }
        }) 
        received.map(mes => {
            if (!arr.includes(String(mes.sender._id))) {
                arr.push(String(mes.sender._id))
                const {_id, firstName, lastName, profilePic} = mes.sender
                const obj = {_id, firstName, lastName, profilePic, message: mes.message, sender: _id, time: mes.timeSent}
                chats.push(obj)
            }
        }) 
        console.log(chats)
        res.json(chats)
        
    } catch (err) {
        res.status(500).json({message: "Problem getting chat!"})
    }
}

module.exports = {
    insertMessage,
    getChat,
    getAllChats
}