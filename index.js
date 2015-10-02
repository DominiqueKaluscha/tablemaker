var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    request = require( "request" ),
    fs = require("fs"),
    app = express(),
    bodyParser = require('body-parser'),
    aws = require('aws-sdk');


var router = express.Router(); 
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3003);


var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


app.get('/', function(req, res) {  
    res.render( "index.html" );
});


app.post('/', function (req, res, next) {
    // input value from search
 	var val = req.param("data");
 	res.json(val);
 	console.log(val);
 	var outputFile = 'src/tables/data/'+val.slug+'.json';
 	fs.writeFile(outputFile, JSON.stringify(val, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to path: " + outputFile);
	    }
	});

    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

    var s3 = new aws.S3();
    var options = {
      Bucket: S3_BUCKET,
      Key: val.slug+'.json',
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', options, function(err, data){
      if(err) return res.send('Error with S3')

      res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
      })
    });


});






app.listen(app.get('port'));

console.log('Server running at http://127.0.0.1:3003/');