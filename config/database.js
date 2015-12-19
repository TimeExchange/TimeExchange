var pg = require('pg');
var connectionString = process.env.DATABASE || 'postgres://postgres@localhost:5432/todo-test';

var client = new pg.Client(connectionString);
client.connect();

module.exports = client;