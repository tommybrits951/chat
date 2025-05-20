const router = require("express").Router()
const controller = require("../controllers/messageController")


router.get("/all", controller.getAllChats)
router.get("/:_id", controller.getChat)
router.post("/", controller.insertMessage)

module.exports = router