var http = requie('http') ;
var express = require('express') ;
var fs = require('fs') ;
var bodyParser = require('body-parser') ;


var app = express() ;

var ejs = requrie('ejs') ;

app.set('views', __dirname + '/views') ;

app.set('view engine', 'ejs') ;

app.engine('html', ejs.renderFile) ;

app.use(bodyParser.json()) ;


app.set('port', process.env.PORT || 50000) ;


var DummyDB = (function() {
	var DummyDB = {} ;
	var sorage = [] ;
	var count = 1 ;

	DummyDB.get = function(id) {
		if(id) {
			id = (typeof id === 'string') ? Number(id) : id ;

			for(var i in sorage){
				if(storage[i].id == id) {
					return storage[i] ;
				}
			}
		}else {
			return storage ;
		}
	} ;

	DummyDB.insert = function(data) {
		data.id = count ++ ;
		storage.push(data) ;
		return data ;
	} ;

	return DummyDB ;
})() ;


app.use(bodyParser.urlencoded({
	extended: false,
}) ;

app.get('showpage', function(req, res) {

	res.send(DummyDB.get()) ;


}) ;


app.get('show', function(req, res) {
	fs.readFile() ;
}) ;

app.get('show/:id', function(req, res) {
	
	//data read
}) ;

app.post('show/:id', function(req, res) {

	//data insert
}) ;





var server = http.createServer(app) ;

server.listen(app.get('port'), function() {
	console.log('server start http://localhost:' + app.get('port')) ;
}) ;

