const router = require("express").Router()
const controller = require("../controllers/friendsController")


router.get("/:user_id", controller.getFriends)


module.exports = router