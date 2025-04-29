const router = require("express").Router()
const controller = require("../controllers/messageController")

router.get("/", controller.getChat)
router.post("/", controller.insertMessage)

module.exports = router