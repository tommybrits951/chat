const router = require("express").Router()
const controller = require("../controllers/userController")
const upperCaseNames = require("../middleware/upperCase")
const checkFields = require("../middleware/checkFields")
const checkAuth = require("../middleware/checkAuth")
const checkImg = require("../middleware/checkImg")
router.post("/", checkFields, upperCaseNames, checkImg, controller.insertUser)
router.get("/:_id", checkAuth, controller.getUserById)
router.get("/", checkAuth, controller.getUsers)
router.post("/pic", controller.changeProfilePic)

module.exports = router