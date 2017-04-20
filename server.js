var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const knexConfig  = require("./knexfile");
const knexLogger  = require('knex-logger');

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL + '?ssl=true',
  searchPath: 'knex,public'
});

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
