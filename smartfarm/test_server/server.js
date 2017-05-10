var http = require('http') ;
var express = require('express') ;
var fs = require('fs') ;
var bodyParser = require('body-parser') ;
var ejs = require('ejs') ;
var path = require('path') ;
var socketio = require('socket.io') ;
var mysql = require('mysql') ;
var db = mysql.createConnection({
	user: 'root',
	password: 'won1228',
	database: 'data'
}) ;


var app = express() ;

app.set('views', path.join(__dirname, '/views')) ;

app.set('view engine', 'ejs') ;

app.use(express.static(path.join(__dirname, '/public'))) ;

app.use(bodyParser.urlencoded({
	extended: false,
})) ;

app.set('port', process.env.PORT || 4000) ;

app.get('/', function(req, res) {

	res.render('home') ;

}) ;

app.get('/show', function(req, res) {

}) ;


app.get('/show/:id', function(req, res) {

	fs.readFile() ;

}) ;

app.post('/show/:id', function(req, res) {

	fs.readFile() ;

}) ;


http.createServer(app).listen(app.set('port'), function() {
	console.log('server start at http://localhost:' + app.get('port')) ;
}) ;

