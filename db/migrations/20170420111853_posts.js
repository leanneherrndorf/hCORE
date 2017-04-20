
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table){
      table.increments('id')
      table.text('description')
      table.integer('health')
      table.boolean('destroyed')
      table.integer('user_id')
      table.integer('topic_id')
      table.timestamp('date_created')
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
