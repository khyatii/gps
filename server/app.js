require('dotenv').config();
var express = require('express');
var path = require('path');
var app = express();


//var port = process.env.port || 3000
var port = 4000
var conn = require('./config/database')

require('./config/config.js')(app);
require('./routes')(app);
console.log(__dirname + '/uploads')
app.use("/uploads", express.static(__dirname + '/uploads'));
app.listen(port);
console.log(`server started on ${port}`)

