/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('friends').del()
  await knex('friends').insert([
    {friendship_id: 1, first_user: 1, second_user: 2, friends_since: '08-25-2024'},
    {friendship_id: 2, first_user: 3, second_user: 1, friends_since: '08-25-2024'},
    {friendship_id: 3, first_user: 1, second_user: 4, friends_since: '08-25-2024'}
  ]);
};
