const router = require("express").Router()
const controller = require("../controllers/messageController")

router.get("/:id", controller.getChats)


module.exports = router