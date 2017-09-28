
var Datastore = require('nedb');


var db = {};

db.commands = new Datastore({ filename: './data/comandos.db', autoload: true });
db.sensors = new Datastore({ filename: './data/sensor.db', autoload: true });


module.exports = db;