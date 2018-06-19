
var http    =  require('http');
var express =  require("express");
var app = express();
var port = process.env.PORT || 3333;
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var mongoosastic = require('mongoosastic');
var config = require('./config/config'); 

require('./model/db');
require('./model/user');

mongoose.connection.on('open' ,  function(err){
    if(err) {
        console.log("Not Connected to the Database" , + err);
    }else{
        console.log("Connected to the Mongo Database");
    }
    app.use(express.static("www"));
    app.use(express.static("profile"));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(multer);
    
    // var corsOption = {
    //     origin: true,
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     credentials: true,
    //     exposedHeaders: ['x-auth-token']
    //   };
    //   app.use(cors(corsOption));
      
/* Manage CORS Access for ALL requests/responses */
app.use(function(req, res, next) {  
     /* Allow access from any requesting client */
    res.header("Access-Control-Allow-Origin", "*");
     /* Set the Http request header */
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    /* Allow access for any of the following Http request types */
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
});

app.get('/', function(req, res){
    setInterval(function() {
        console.log("you would be seeing the logs of your app");
    }, 3000);
    setInterval(function() {
        console.log("right here.");
    }, 1500);
    setInterval(function() {
        console.log("as it runs");
    }, 1500);
    setInterval(function() {
        console.log("isn't that exciting?");
    }, 5000);
    res.end("Hello world.  I'm demonstrating the functionality of /dash.html by logging test messages on an interval.");
});

var server = app.listen(port, function () {
    var port = server.address().port;
    console.log("Application now running on port", port);
  });



// Export app
exports = module.exports = app;
})

 var routes = require('./routes/routes');