const router = require("express").Router()
const controller = require("../controllers/userController")
const upperCaseNames = require("../middleware/upperCase")
const checkFields = require("../middleware/checkFields")
const checkAuth = require("../middleware/checkAuth")

router.post("/",  checkFields, upperCaseNames, controller.insertUser)
router.get("/:_id", checkAuth, controller.getUserById)
router.get("/", checkAuth, controller.getUsers)
router.post("/pic", controller.changeProfilePic)
router.post("/add", checkAuth, controller.addFriend)
module.exports = router