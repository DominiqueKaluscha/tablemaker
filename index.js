var express = require( "express" ),
    path = require( "path" ),
    request = require( "request" ),
    fs = require("fs"),
    app = express(),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    knox = require('knox'),
    MultiPartUpload = require('knox-mpu');


dotenv.load();


var client = knox.createClient({
    key: process.env.AWS_ACCESS_KEY,
    secret: process.env.AWS_SECRET_KEY,
    bucket: process.env.S3_BUCKET
}),
upload = null;


// aws.config.region = 'us-east-1';


var router = express.Router(); 
// app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'src')));
app.use(bodyParser.urlencoded({
        extended: true,
     parameterLimit: 10000,
     limit: 1024 * 1024 * 10
}));
app.use(bodyParser.json({
        extended: true,
     parameterLimit: 10000,
     limit: 1024 * 1024 * 10
}));


app.set('port', process.env.PORT || 3003);


// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
// var S3_BUCKET = process.env.S3_BUCKET;


app.get('/', function(req, res) {  
    res.render( "index.html" );
});


app.post('/', function (req, res, next) {
    // input value from search
    var d = new Date();
    var month = d.getMonth(), year = d.getFullYear(),
 	    val = req.param("data");
 	res.json(val);

 	var localFile = 'src/data/temp.json';
    var awsFile = '/tablemaker/data/'+year+'/'+month+'/'+val.slug+'.json';

    var string = JSON.stringify(val);
    
    req.on('response', function(res){
        
      if (200 == res.statusCode) {
        console.log('saved to %s', req.url);
      }
    });

 	fs.writeFile(localFile, JSON.stringify(val, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	       
            upload = new MultiPartUpload(
                {
                    client: client,
                    objectName: awsFile, // Amazon S3 object name
                    file: localFile,
                    headers: { 'x-amz-acl': 'public-read' }
                },
            // Callback handler
                function(err, body) {
                    console.log("JSON saved to path: " + localFile);
                    // If successful, will return body, containing Location, Bucket, Key, ETag and size of the object
                    console.log(body);
                      // {
                      //     Location: 'http://Example-Bucket.s3.amazonaws.com/destination.txt',
                      //     Bucket: 'Example-Bucket',
                      //     Key: 'destination.txt',
                      //     ETag: '"3858f62230ac3c915f300c664312c11f-9"',
                      //     size: 7242880
                      // }
                    
                }
            );
	    }
	});

    


});






app.listen(app.get('port'));

console.log('Server running at http://127.0.0.1:3003/');