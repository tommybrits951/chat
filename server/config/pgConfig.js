const pg = require("pg")
const {Pool} = pg

const pool = new Pool({
    host: "localhost",
    database: "chat",
    user: "postgres",
    password: "Benoni951!",
    port: 5432
})

module.exports = pool