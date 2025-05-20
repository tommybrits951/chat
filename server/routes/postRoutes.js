const router = require("express").Router()
const controller = require("../controllers/postContoller")
const checkAuth = require("../middleware/checkAuth")

router.post("/", checkAuth, controller.createPost)
router.get("/:_id", checkAuth, controller.getPostsByBoard)
router.put("/:_id", controller.updatePost)

module.exports = router