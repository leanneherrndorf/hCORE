const knexConfig  = require("./knexfile");
const knexLogger  = require('knex-logger');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true',
  searchPath: 'knex,public'
});

function updateRank(username, newExp) {

  knex('users')
    .where('username', '=', username)
    .update({
      experience: newExp
    })
    return;
}

function findPassword(username) {
  let submitCountArr = [];
  return new Promise((resolve, reject) => {
    knex.select('*').from('options')
    .where('id', '=', optionId)
    .asCallback(function(err, rows) {
      if (err) return reject(err);
      knex.select('*').from('poll')
      .where('id', '=', rows[0].poll_id)
      .asCallback(function(err, rows2) {
        if (err) return reject(err);
        resolve({email: rows2[0].admin_email, url: rows2[0].admin_url});
      });
   });
  });
}