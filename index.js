var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    request = require( "request" ),
    fs = require("fs"),
    app = express(),
    bodyParser = require('body-parser'),
    aws = require('aws-sdk'),
    aws.config.region = 'us-east-1';


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
    var body = fs.createReadStream(outputFile);
    var s3obj = new aws.S3({params: {Bucket: 'ajc-producer-tools', Key: 'tablemaker/data/'}});

    s3obj.upload({Body: body}).
      on('httpUploadProgress', function(evt) { console.log(evt); }).
      send(function(err, data) { console.log(err, data) });


});






app.listen(app.get('port'));

console.log('Server running at http://127.0.0.1:3003/');