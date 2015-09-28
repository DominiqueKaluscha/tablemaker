var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    request = require( "request" ),
    fs = require("fs"),
    app = express(),
    bodyParser = require('body-parser'),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, '/src' )));


var router = express.Router(); 
app.use(express.static('src'));
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/tables', router);

// nunjucksEnv.express( app );



// // middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });


app.get('/', function(req, res) {  
    res.render( "index.html" );
});

// app.get('/tables',function (req,res){
// 	res.writeHead(200, {'Content-Type': 'application/json'});
// })


app.post('/', function (req, res, next) {
    // input value from search
 	var val = req.param("data");
 	res.json(val);
 	console.log(val);
 	var outputFile = 'tables/data/'+val.slug+'.json';
 	fs.writeFile(outputFile, JSON.stringify(val, null, 4), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to path: " + outputFile);
	    }
	}); 
});






app.listen(3003);

console.log('Server running at http://127.0.0.1:3003/');