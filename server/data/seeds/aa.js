/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {user_id: 1, username: "tommy", email: "tom@tom.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-08-21"},
    {user_id: 2, username: "jake", email: "jake@jake.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-07-21"},
    {user_id: 3, username: "jim", email: "jim@jim.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-07-21"},
    {user_id: 4, username: "jenny", email: "jenny@jim.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-07-21"},
    {user_id: 5, username: "dale", email: "dale@jim.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-07-21"},
    {user_id: 6, username: "jennifer", email: "jennifer@jim.com", password: "$2b$10$0hxHNkdiaj2ghLymweKcR.vuFe9yez06ipnjlNzmWY8z46J.1ZXbG", joined: "2024-07-21"},
    
    
  ]);
};
