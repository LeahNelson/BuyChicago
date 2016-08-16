// Configure and test DB
// +++++++++++++++++++++
// 
var fs = require('fs'),
    file = 'test.db',
    exists = fs.existsSync(file),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Stuff (thing TEXT)"));
  }
});    
