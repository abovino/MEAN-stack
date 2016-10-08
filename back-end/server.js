var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var moment = require('moment');

var auth = require('./controllers/auth');
var message = require('./controllers/message');
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.get('/api/message', message.get);

app.post('/api/message', checkAuthenticated, message.post);

app.post('/auth/register', auth.register);

//Database Connection
mongoose.connect("mongodb://localhost:27017/test", function(err,db) {
  if(!err) {
    console.log("Connected to Mongo");
  }
});

var server = app.listen(5000, function() {
  console.log("Listening on port", server.address().port)
});