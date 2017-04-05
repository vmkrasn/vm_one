var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/list', function (req, res) {
  res.send('<!DOCTYPE html><h1>Hello World</h1>')
})

app.get('/user', function (req, res) {
  res.send('Get user')
})

app.post('/user', function (req, res) {
	console.log(req.body);
  res.send('Post user')
})


app.post('/create-user', function (req, res) {
	console.log(req.body);
	res.statusCode = 201;
  res.send('User was created. His name is: ' + req.body.name);
})

app.listen(3001);

console.log('Server listening port 3001');


// var express = require('express')
// var app = express()
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.post('/create-user', function (req, res) {
//   res.send('User was created');
// })
 
// app.listen(3000)