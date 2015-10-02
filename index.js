var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    request = require( "request" ),
    fs = require("fs"),
    app = express(),
    bodyParser = require('body-parser'),
    knox = require('knox').createClient({
        key: process.env.AWS_ACCESS_KEY,
        secret: process.env.AWS_SECRET_KEY,
        bucket: process.env.S3_BUCKET
    });


// aws.config.region = 'us-east-1';


var router = express.Router(); 
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3003);


// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
// var S3_BUCKET = 'ajc-producer-tools';


app.get('/', function(req, res) {  
    res.render( "index.html" );
});


app.post('/', function (req, res, next) {
    // input value from search
    var d = new Date();
    var month = d.getMonth(), year = d.getFullYear(),
 	    val = req.param("data");
 	res.json(val);
 	console.log(val);
 	// var localFile = 'src/tables/data/'+val.slug+'.json';
    var awsFile = '/tablemaker/data/'+year+'/'+month+'/'+val.slug+'.json';

    var string = JSON.stringify(val);
    var req = knox.put(awsFile, {
        'Content-Length': Buffer.byteLength(string),
        'Content-Type': 'application/json',
        'x-amz-acl': 'public-read'
    });
    req.on('response', function(res){
      if (200 == res.statusCode) {
        console.log('saved to %s', req.url);
      }
    });
    req.end(string);


 // 	fs.writeFile(localFile, JSON.stringify(val, null, 4), function(err) {
	//     if(err) {
	//       console.log(err);
	//     } else {
	//       console.log("JSON saved to path: " + localFile);
	//     }
	// }).then(function(){
 //        knox.putFile(localFile, awsFile, {'Content-Type': 'application/json', 'x-amz-acl': 'public-read' }, function(err, result) {
 //            if (200 == result.statusCode) { console.log('Uploaded to amazon S3'); }
 //            else { console.log('Failed to upload file to Amazon S3'); }
 //        });
 //    });

    


});






app.listen(app.get('port'));

console.log('Server running at http://127.0.0.1:3003/');