var express = require( "express" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    request = require( "request" ),
    app = express(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, '/src' )));

app.use(express.static('src'));
// app.use('/tables', express.static('tables'));

nunjucksEnv.express( app );

app.get('/', function(req, res) {  
    res.render( "index.html" );
});

app.get('/tables', function (req, res) {
    // input value from search
 	var val = req.query.search;
 	console.log(val);
});




app.listen(3003);

console.log('Server running at http://127.0.0.1:3003/');