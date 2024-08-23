/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("rooms", tbl => {
    tbl.bigIncrements("room_id").primary()
    tbl.string("room_name").notNullable()
    tbl.dateTime("room_created").notNullable()
    tbl.integer("room_host").unsigned().references("user_id").inTable("users")
  })
  .createTable("posts", tbl => {
    tbl.bigIncrements("post_id").primary()
    tbl.string("post_text").notNullable()
    tbl.dateTime("post_date").notNullable()
    tbl.integer("post_user").unsigned().references("user_id").inTable("users")
    tbl.integer("post_likes").defaultTo(0)
  })
  .createTable("post_likes", tbl => {
    tbl.increments("post_like_id").primary()
    tbl.integer("post_like_user").unsigned().references('user_id').inTable("users")
  })
  .createTable("post_comments", tbl => {
    tbl.increments("post_comment_id").primary()
    tbl.bigInteger("post_id").unsigned().references("post_id").inTable("posts")
    tbl.integer("post_comment_user").unsigned().references("user_id").inTable("users")
    tbl.string("post_comment").notNullable()
    tbl.dateTime("post_comment_date")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("post_comments").dropTableIfExists("post_likes").dropTableIfExists("posts").dropTableIfExists("rooms")
};
