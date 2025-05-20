const Board = require("../models/Board")

async function createBoard(req, res) {
    try {
        
        const {subject, user, category} = req.body;
        
        if (!user) {
            return res.status(401).json({message: "Auth didn't supply user in request body!"})
        }
        if (!subject) {
            return res.status(400).json({message: "Need subject for post board!"})
        }
        const board = await Board.create({subject, category, creater: user._id})
        if (board) {
            return res.status(201).json({message: "Board created.."})
        }
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem with creating board!"})
    }
}

async function closeBoard(req, res) {
    try {
        const {_id} = req.params
        const {user} = req.body
        if (!_id || !user) {
            return res.status(400).json({message: "Missing board ID or user"})
        }
        const result = await Board.findOneAndDelete({_id: _id}) 
        if (result) {
            res.json({message: "Post board closed!"})
        }
        
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem with closing board!"})
    }
}

async function getAllBoards(req, res) {
    try {
        const boards = await Board.find()
        res.status(200).json(boards)
    } catch (err) {
        res.status(500).json({message: err.message || "Problem getting post boards!"})
    }
}

module.exports = {
    createBoard,
    closeBoard,
    getAllBoards
}