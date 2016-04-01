var express = require('express');
var app = express();
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
//------------------------------------
var bodyParser = require('body-parser');
var multer =require('multer');
var uuid = require('node-uuid');
var mongoose = require('mongoose');

//console.log(mongoose);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET }));

//-------------------------------------

var connectionString = 'mongodb://127.0.0.1:27017/webdev';

//console.log(mongoose);
//console.log(db);

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

// require is not working
var assignment = require("./public/assignment/server/app.js")(app, db, mongoose);
var proj = require("./public/project/server/app.js")(app, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);