var express = require('express') ;
var http = require('http') ;
var net = require('net') ;
var fs = require('fs') ;
var bodyParser = require('body-parser') ;
var socketio = require('socket.io') ;
var mysql = require('mysql') ;

var ejs = require('ejs') ;
var path = require('path') ;

var db = mysql.createConnection({
	user: 'root',
	password: 'won1228',
	database: 'smart'
}) ;


var app = express() ;

app.set('port', process.env.PORT || 5000) ;

app.set('views', path.join(__dirname, '/views')) ;

app.set('view engine', 'ejs') ;

app.use(bodyParser.json()) ;

app.use(express.static(path.join(__dirname,'./public'))) ;

app.use(bodyParser.urlencoded({
	extended: false,
})) ;


app.get('/', function(req, res) {
	res.render('home') ;
}) ;

app.get('/login', function(req, res) {

}) ;

app.get('/registe', function(req, res) {

}) ;

app.get('/chanel/create', function(req, res) {

}) ;

app.get('/chanel/showpage', function(req, res) {

}) ;

app.get('/chanel/show/:id', function(req, res) {
//subdoname
	
}) ;

app.post('/chanel/show/:id', function(req, res) {
//subdoname
	
}) ;



app.use(function(err, req, res, next){

}) ;

app.use(function(err, req, res, next) {

}) ;

http.createServer(app).listen(app.get('port'), function() {
	console.log('server start localhost:' + app.get('port') ) ;
}) ;

