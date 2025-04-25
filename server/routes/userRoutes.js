const router = require("express").Router()
const controller = require("../controllers/userController")
const upperCaseNames = require("../middleware/upperCase")
const checkAuth = require("../middleware/checkAuth")
router.post("/", upperCaseNames, controller.insertUser)
router.get("/:_id", checkAuth, controller.getUserById)
router.get("/", checkAuth, controller.getUsers)


module.exports = router