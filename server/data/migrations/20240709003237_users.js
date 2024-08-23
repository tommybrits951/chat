/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id").primary()
    tbl.string("username").notNullable().unique()
    tbl.string("email").notNullable().unique()
    tbl.string("password").notNullable()
    tbl.date("joined").notNullable()
    tbl.string("image_path").defaultTo("/images/default.jpg")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
