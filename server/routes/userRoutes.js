const router = require("express").Router()
const controller = require("../controllers/userController")

router.get("/", controller.getAll)
router.get("/:user_id", controller.getUser)
router.post("/", controller.register)
router.delete("/", controller.removeUser)
module.exports = router