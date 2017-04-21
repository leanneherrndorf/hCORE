cd exports.seed = function(knex, Promise) {
  return knex('topics').del()
  .then(function () {
    return Promise.all([
      knex('topics').insert({name: 'Food'})
    ]);
  })
}
