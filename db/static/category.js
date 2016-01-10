var fsp = require('fs-time-prefix');


fsp.readFile('./raw_category.txt')
.then(function(chunk){
  var data = chunk.toString().split('=');
  var category = [];
  data.forEach(function(cat){
    var rows = cat.split('\n');
    var struct = {};
    console.log(rows[0]);
    for (var i = 0; i < rows.length; i++) {
      struct[howManyIndents(rows[i])].push(rows[i]);
    };
    console.log(struct);
    rows.reduce(function(prev,cur,idx,arr){
      var currentCat = {};
      if (howManyIndents(cur) === 0){
        currentCat.name  = cur.split(',')[0];
        currentCat.alias = cur.split(',')[1];
      } else {
        currentCat = prev;
        currentCat.sub = [];
      }
      return currentCat
    },rows[0])
  })

});


function howManyIndents (row) {
  var data = row.split('  ');
  var indents = 0;
  // console.log(data[1]==='');
  for (var i = 0; i < data.length; i++) {
    if (data[i] === '')
      indents++;
  };
  return indents;
}


module.exports = [{
  'name'  : '程式設計類',
  'alias' : 'Programming',
  'sub'   : [
    {'name' : 'Python', 'alias' :'Python'},
    {'name' : 'Node.js', 'alias' :'Node.js'},
    {'name' : 'C++', 'alias' :'C++'},
    {'name' : 'HTML/CSS', 'alias' :'HTML/CSS'},
    {'name' : 'C', 'alias' :'C'},
    {'name' : 'Java', 'alias' :'Java'},
    {'name' : 'C#', 'alias' :'C#'},
    {'name' : 'PHP', 'alias' :'PHP'},
    {'name' : 'Swift', 'alias' :'Swift'},
    {'name' : 'Ruby on Rails', 'alias' :'Ruby on Rails'}
    ]
},{
  'name'  : '語言類',
  'alias' : 'Languages',
  'sub'   : [
    {'name' : '中文', 'alias' : 'Chinese'},
    {'name' : '中文寫作', 'alias' : 'Chinese Writing'},
    {'name' : '中文口說', 'alias' : 'Chinese Oral'},
    {'name' : '英文', 'alias' : 'English'},
    {'name' : '英文寫作', 'alias' : 'English Writing'},
    {'name' : '英文口說', 'alias' : 'English Oral'},
    {'name' : '法文', 'alias' : 'French'},
    {'name' : '法文寫作', 'alias' : 'French Writing'},
    {'name' : '法文口說', 'alias' : 'French Oral'},
    {'name' : '德文', 'alias' : 'German'},
    {'name' : '德文寫作', 'alias' : 'German Writing'},
    {'name' : '德文口說', 'alias' : 'German Oral'},
    {'name' : '西班牙文', 'alias' : 'Spanish'},
    {'name' : '西班牙文寫作', 'alias' : 'Spanish Writing'},
    {'name' : '西班牙文口說', 'alias' : 'Spanish Oral'},
    {'name' : '日文', 'alias' : 'Japanese'},
    {'name' : '日文寫作', 'alias' : 'Japanese Writing'},
    {'name' : '日文口說', 'alias' : 'Japanese Oral'}
  ]
}]


