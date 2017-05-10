var mysql = require('mysql') ;
var pool = mysql.createPool({
	connectionLimit: 10,
	host: ' ',
	user: 'root',
	password: '',
	database: 'test',
	debug: false
} ;

var addUser = function(id, password, name, sex, email, callback){
	console.log('addUser called id %s, password %s, name %s, sex %s, email %s', id, password, name, sex, email) ;

	pool.getConnection(function(err, conn){
		if(err){
			if(conn){
				conn.release() ;
			}
			callback(err, null) ;
			return ;
		}
		console.log('database thread id : ' + conn.threadId) ;

		var data = {id:id, password: password, name: name, sex: sex, email: email} ;

		var exec = conn.query('insert into user set ?', data, function(err, result){
			conn.release() ;
			console.log('SQL' + exec.sql) ;
			if(err){
				console.log('error message : ' + err.stack) ;
				console.dir(err) ;

				callback(err, null) ;

				return ;
			}
			callback(null, result) ;
		}) ;

		conn.on('error', function(err){
			console.log('database error : ' + err.stack) ;
			console.dir(err) ;

			callback(err, null) ;

		}) ;
	}) ;
}

var authUser = function(id, password, callback){
	console.log('authUser called id %s, password %s', id, password) ;
	pool.getConnection(function(err, conn){
		if(err){
			if(conn){
				conn.release() ;
			}
			callback(err, null) ;
			return ;
		}
		console.log('database thread Id : ' + conn.threadId) ;

		var colums = ['id', 'password', 'name', 'sex', 'email'] ;
		var tablename = 'user' ;

		var exec = conn.query('select ?? from ?? where id = ? and password = ?', [colums, tablename, id, password], function(err, rows){
			conn.release() ;
			console.log('SQL ' + exec.sql) ;

			if(rows.length > 0){
				console.log('id %s , password %s ', id, password) ;
				callback(null, rows) ;
			} else{
				console.log('could not found') ;
				callback(null, null) ;
			}
		}) ;

		conn.on('error', function(err){
			console.log('database error ' + err.stack) ;
			cosole.dir(err) ;

			callback(err, null) ;
		}) ;
	}) ;
} 




module.exports addUser(id, password, name, sex, email, callback) ;
module.exports authUser(id, password, callback) ;

