const fs = require("fs")
const fsPromises = require("fs/promises")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

async function checkImg(req, res, next) {
    try {
        const { firstName, lastName } = req.body
        let img
        const imageId = uuidv4()
        const filePath = `${firstName}_${lastName}_${imageId}`
        let fileName = `${firstName}_${lastName}_${imageId}_profile_.jpg`

        console.log(filePath)
        if (req.files !== null) {
            img = req.files.img.data
            console.log(img)
        } else {
            img = fs.readFileSync(path.join(__dirname, "..", "images", "default", "account.png"))
            console.log(img)
        }
        if (!fs.existsSync(path.join(__dirname, "..", "images", filePath))) {
            fsPromises.mkdir(path.join(__dirname, "..", "images", filePath))
        }
        fsPromises.appendFile(path.join(__dirname, "..", "images", filePath, fileName), img)
        req.body.imageId = imageId
        req.body.profilePic = `${filePath}/${fileName}`
        next()
    } catch (err) {
        res.status(500).json({ message: "couldn't resolve profile image!" })
    }
}

module.exports = checkImg