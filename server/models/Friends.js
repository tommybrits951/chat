const db = require("../config/dbConfig")
const pool = require("../config/pgConfig")

async function insertFriendship(friendship) {
    const [{friendship_id}] = await db("friends").insert(friendship).returning("friendship_id")
    const results = await db("friends").where("friendship_id", friendship_id)
    return results
}


async function getFriends(user_id) {
     const friends1 = await pool.query(`select u.username, f.friends_since, u.user_id from friends as f right join users as u on f.first_user = u.user_id where f.second_user = ${user_id}`)
    const friends2 = await pool.query(`select u.username, f.friends_since, u.user_id from friends as f right join users as u on f.second_user = u.user_id where f.first_user = ${user_id}`)
     let friends = []
    for (let i = 0; i < friends1.rows.length; i++) {
        friends.push(friends1.rows[i])
    }
    for (let i = 0; i < friends2.rows.length; i++) {
        friends.push(friends2.rows[i])
    }
    
    console.log(friends)
    return friends
}



module.exports = {
    getFriends,
    insertFriendship
}