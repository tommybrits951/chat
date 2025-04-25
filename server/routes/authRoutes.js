const controller = require("../controllers/authController")
const router = require("express").Router()

router.post("/", controller.login)
router.get("/", controller.refreshHandle)

module.exports = router