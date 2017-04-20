
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id')
      table.string('username')
      table.string('password')
      table.integer('experience')
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
