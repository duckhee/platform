var formidable = require('formidable') ;

var uploadDir = __dirname + '/upload' ;
var imageDir = __dirname + '/upload/img' ;



function addNewMovie(req, res) {
   var form = new formidable.IncomingForm();
  form.keepExtenstion = true;
   form.uploadDir = uploadDir;
   form.parse(req, function(err, fields, files) {
      if ( err ) {
         res.statusCode = 404;
         res.end('Error');
         return;
      }

      var title = fields.title;
      var director = fields.director;
      var year = fields.year;

      var poster = files.poster;
      //poster.path;
      var ext = pathUtil.extname(poster.name);
      var newFileName = title + ext;
      var newPath = imageDir + pathUtil.sep + newFileName;

      fs.renameSync(poster.path, newPath);
      var url = '/images/' + newFileName; // /images/Starwars7.jpg

      var info = {
         title : title,
         director : director,
         year : year,
         poster : url
      };
      movieList.push(info);

      res.statusCode = 302;
      res.setHeader('Location', '.');
      res.end();
   });

}

function showList(req, res) {
   var html = '<html>';
   html += '<head>';
   html += '<meta chatset="UTF8">';
   html += '<style>';
   html += 'form label { width:100px; display:inline-block; }'
   html += 'li img { height:100px }';
   html += '</style>';
   html += '</head>';
   html += '<body>';
   html += '<h1>Favorite Movie</h1>';
   html += '<div>';
   html += '<ul>';
   movieList.forEach(function(movie) {
      html += '<li>';
      if ( movie.poster ) {
         html += '<img src="' + movie.poster +'">';
      }
      html += movie.title + '(' + movie.director + ',' + movie.year + ')' + '</li>';
   });
   html += '</ul>';
   html += '</div>';

   html += '<form method="post" action="." enctype="multipart/form-data">';
   html += '<h4>새 영화 입력</h4>';
   html += '<ul>';
   html += '<li><label>영화 제목</label><input type="text" name="title"></li>';
   html += '<li><label>영화 감독</label><input type="text" name="director"></li>';
   html += '<li><label>연도</label><input type="number" name="year"></li>';
   html += '<li><label>포스터</label><input type="file" name="poster"></li>';
   html += '</ul>';
   html += '<input type="submit" value="올리기">';
   html += '</form>';

   html += '</body>';
   html += '</html>';
   res.writeHeader(200, {'Contnet-Type':'text/html'});
   res.end(html);
}
