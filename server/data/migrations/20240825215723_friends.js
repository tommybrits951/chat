/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("friends", tbl => {
    tbl.bigIncrements("friendship_id").primary()
    tbl.bigInteger("first_user").unsigned().references("user_id").inTable("users")
    tbl.bigInteger("second_user").unsigned().references("user_id").inTable("users")
    tbl.date("friends_since").notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends")
};
