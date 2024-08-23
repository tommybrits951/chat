const db = require("../config/dbConfig")


function getAllUsers() {
    let res = db("users").select("username")
    return res
}

function getUserById(id) {
    const user = db("users").where("user_id", id).first()
    return user
}


async function insertUser(user) {
    const [{id}] = await db("users").insert(user).returning("user_id")
    const result = await getUserById(id)
    return result 
}

function getUserByUsername(username) {
    const user = db("users").where("username", username).first()
    return user
}
async function getUserByEmail(email) {
    const user = await db("users").where("email", email).first()
    return user
}
function deleteUser(id) {
    const user = db("users").where("user_id", id).delete()
    return user
}
module.exports = {
    getAllUsers,
    getUserByEmail,
    insertUser,
    getUserById,
    getUserByUsername,
    deleteUser
}