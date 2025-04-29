const controller = require("../controllers/authController")
const router = require("express").Router()

router.post("/", controller.login)
router.get("/", controller.refreshHandle)
router.get("/user", controller.authUser)

module.exports = router