const Post = require("../models/Post")
const Board = require("../models/Board")

async function createPost(req, res) {
    try {
        const {boardId, text, user} = req.body
        if (!boardId || !text) {
            return res.status(400).json({message: "All fields required!"})
        }
        if (!user) {
            return res.status(500).json({message: "Didn't get user from authorization!"})
        }
        const board = await Board.findById(boardId)
        if (!board) {
            return res.status(400).json({message: "Couldn't find board!"})
        }
        const post = await Post.create({
            author: user._id,
            subject: board._id,
            text,
            comments: [],
            likes: []
        })
        if (post) {
            res.status(201).json(Post)
        }
    } catch (err) {
        res.status(500).json({message: err.message || "Problem creating post"})
    }
}



async function getPostsByBoard(req, res, next) {
    try {
        const {_id} = req.params;
        if (!_id) {
            return res.status(400).json({message: "Need board _id"})
        }
        const board = await Board.findById(_id)
        if (!board) {
            return res.status(400).json({message: `No board found with _id of ${_id}`})
        }
        const posts = await Post.findOne({subject: _id}).populate("subject").populate("author")
        if (posts) {
            return res.status(200).json(posts)
        }
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem getting posts!"})
    }
}


async function updatePost(req, res) {
    try {
        const {_id} = req.params
        const {likes} = req.body
        const result = await Post.findByIdAndUpdate(_id, {likes: likes})

        return res.status(201).json(result)
    } catch (err) {
        return res.status(500).json({message: "Problem updating post."})
    }
}



module.exports = {
    createPost,
    updatePost,
    getPostsByBoard

}