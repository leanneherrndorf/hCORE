exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({username: 'CoolGuy3000', password: 'password', experience: 0}),
        knex('users').insert({username: 'Jimbo', password: 'password', experience: 0}),
        knex('users').insert({username: 'CharlieBoy', password: 'password', experience: 0}),
        knex('users').insert({username: 'Emily123', password: 'password', experience: 0}),
        knex('users').insert({username: 'Glinkus', password: 'password', experience: 0})
      ]);
    });
};
