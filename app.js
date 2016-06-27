
var express   =   require( 'express' )
var http       =    require( 'http' )
var async     =    require( 'async' )
var multer    =   require( 'multer' )
var upload     =    multer( { dest: 'uploads/' } )
var exphbs    =   require( 'express-handlebars' )
var easyimg   =    require( 'easyimage' )
var _         =    require( 'lodash' )
var cv         =   require( 'opencv' );


var exts = {
  'image/jpeg'   :   '.jpg',
  'image/png'    :   '.png',
  'image/gif'    :   '.gif'
}


var port = 8080;
var app = express();

app.use(express.static(__dirname + '/public'))

app.engine('.hbs', exphbs( { extname: '.hbs', defaultLayout: 'layout' } ) );
app.set( 'view engine', '.hbs' );

app.get('/', function( req, res, next ) {

  return res.render('index');

});
app.post('/upload', upload.single('file'), function(req, res, next){

  
  var filename = req.file.filename + exts[req.file.mimetype];
  var src = __dirname + '/' + req.file.path
  var dst = __dirname + '/public/images/' + filename;

  async.waterfall(
    [
      function( callback ) {
        easyimg.resize(
          {
            width      :   960,
            src        :   src,
            dst        :   dst
          }
        ).then(function(image) {
          return callback();
        });
      },
      function( callback ) {
        cv.readImage( dst, callback );
      },
      function( im, callback ) {

        im.detectObject( cv.FACE_CASCADE, {}, callback );

      }

    ],
    function( err, faces ) {

      if ( err ) {

        return res.render(
          'error',
          {
            message : err.message
          }
        );
      }

      /**
       * We're all good; render the result page.
       */
      return res.render(
        'result',
        {
          filename   :   filename,
          faces     :   faces
        }
      );

    }
  );

});

/**
 * Start the server
 */
http.createServer(
  app
).listen( port, function( server ) {
  console.log( 'Listening on port %d', port );
});