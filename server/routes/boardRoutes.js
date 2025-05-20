const router = require("express").Router()
const controller = require("../controllers/boardController")
const checkAuth = require("../middleware/checkAuth")

router.post("/", checkAuth, controller.createBoard)
router.delete("/", checkAuth, controller.closeBoard)
router.get("/", controller.getAllBoards)

module.exports = router;