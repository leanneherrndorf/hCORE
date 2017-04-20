exports.seed = function(knex, Promise) {
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        knex('posts').insert({health: 1, description: "Such a terrible topic.", destroyed: false, destroyed: false, user_id: 1, topic_id: 1, date_created: '2017-04-20 11:45:02'}),
        knex('posts').insert({health: 1, description: "Coolest topic EVER!! Please don't delete me :(", destroyed: false, user_id: 2, topic_id: 1, date_created: '2017-04-20 12:12:02'}),
        knex('posts').insert({health: 1, description: "Delete me if you want, but you know I'm right.", destroyed: false, user_id: 3, topic_id: 1, date_created: '2017-04-20 16:30:02'}),
        knex('posts').insert({health: 1, description: "Hey creatures! I'm an awesome post!", destroyed: false, user_id: 4, topic_id: 1, date_created: '2017-04-20 17:30:02'}),
        knex('posts').insert({health: 1, description: "My first post, and this topic is really great!", destroyed: false, user_id: 5, topic_id: 1, date_created: '2017-04-20 18:30:02'})
      ]);
    });
};