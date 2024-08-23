const router = require("express").Router()
const controller = require("../controllers/authController")

router.post("/", controller.login)
router.get("/", controller.authRefresh)


module.exports = router