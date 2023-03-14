/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    {id: 1 ,username: 'bob', password: '$2a$08$kfbvatmN4Im4Lg.aMCnISOLqyC4JS4nB35ZkaIUep3yERVvl3Iihq'},
  ]);
};
