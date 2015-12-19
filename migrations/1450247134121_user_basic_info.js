exports.up = function(pgm, run) {
  pgm.createTable('user',{
    id : 'id',
    username : {type : "text", unique: true, notNull: true},
    password : {type : "text", notNull: true},
    nickname : {type : "text"},
    createAt : {type : "timetz", notNull: true}
  });
  run();
};
/*
  type [string] - data type (use normal postgres types)
  unique [boolean] - set to true to add a unique constraint on this column
  primaryKey [boolean] - set to true to make this column the primary key
  notNull [boolean] - set to true to make this column not null
  check [string] - sql for a check constraint for this column
  references [string] - a table name that this column is a foreign key to
*/
exports.down = function(pgm) {

};
