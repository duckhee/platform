var http = require('http') ;
var express = require('express') ;
var net = require('net') ;
var fs = require('fs') ;
var socketio = require('socket.io') ;
var path = require('path') ;
var bodyParser = require('body-parser') ;
var cookieParser = require('cookie-parser') ;
var expressSession = require('express-session') ;
var mysql = require('mysql') ;
var ejs = require('ejs') ;
var multer = require('multer') ;
var cors = require('cors') ;
var morgan = require('morgan') ;



var formidable = require('formidable') ;


var userQuery = require('./lib/user_query.js') ;



var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'won1228',
	database: 'smart',
	debug: false
}) ;

var db = mysql.createConnection({
	name: 'root',
	password: 'won1228',
	database: 'smart'
}) ;

var app = express() ;

app.set('port', process.env.PORT || 5000) ;

app.set('views', path.join(__dirname, '/views')) ;

app.set('view engine', 'ejs') ;

app.use(bodyParser.json()) ;

app.use(express.static(path.join(__dirname, '/public'))) ;

app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) ;

app.use(bodyParser.urlencoded({
	extended: false,
})) ;

http.createServer(app).listen(app.get('port'), function(){
	console.log('server start at http://localhost:' + app.get('port')) ;
}) ;

app.get('/', function(req, res){
	res.render('./index') ;

}) ;

app.get('/login', function(req, res){
	
	res.render('./member/loginpage_2') ;

}) ;

app.post('/process/login', function(req, res){
	var id = req.params.id || req.query.id ;
	var password = req.params.password || req.query.password ;

	console.log('id :' + id + ' password : ' + password) ;

	res.redirect('/') ;
}) ;



app.get('/registe', function(req, res){
	res.render('./member/registepage_2') ;

}) ;

app.post('/process/registe', function(req, res) {
	console.log('/process/registe called') ;
	
	var id = req.body.id || req.query.id ;
	var password = req.body.password || req.query.password ;
	var name = req.body.name || req.query.name ;
	var sex = req.body.sex || req.query.sex ;
	var email = req.body.email || req.query.email ;

	console.log('id : ' + id + 'password : ' + password + 'name : ' + name + 'sex : ' + sex + 'email : ' + email) ;
	
	res.redirect('/login') ;
}) ;

	

app.get('/chanel/create', function(req, res){

}) ;

app.get('/chanel/showpage', function(req, res){


}) ;

app.get('chanel/show', function(req, res)  {

}) ;

app.get('chanel/show/:id', function(req, res){


}) ;

app.post('/chanel/show/:id', function(req, res){


}) ;

app.get('/chanel/show/public', function(req, res) {

}) ;


app.get('/blog/list', function(req, res){

}) ;

app.get('/blog/create', function(req, res){

}) ;

app.post('/blog/create', function(req, res){

}) ;

app.get('/file/upload', function(req, res) {

	var now = new Date() ;

	res.render('./file_view/fileupload',{year: now.getFullYear(), month: now.getMonth()}) ;

}) ;

app.post('/process/fileupload/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm() ;

	form.uploadDir = __dirname + '/uploads' ;
	form.keepExtention = true ;


	form.parse(req, function(err, fields, files) {
		if(err){
			return res.render('/file/upload') ;
			console.err(err.stack) ;
		} else{
			console.log('received fileds:') ;
			console.log(fields) ;
			console.log('received files : ') ;
			console.log(files) ;
			res.redirect('/') ;
		}
	}) ;
}) ;



app.get('/file/download', function(req, res) {

}) ;




