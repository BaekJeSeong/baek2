var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session');
var bodyParser = require('body-parser');
var routes = require('./routes');
var mongoose = require('mongoose');

mongoose.connect('mongodb://BaekJeSeong:as730802@ds157923.mlab.com:57923/miro2hackathon', { useNewUrlParser: true });
//{ useNewUrlParser: true });

app.use(bodyParser.json());
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);
// app.use('/', routes);
app.use(express.static(__dirname + '/src'));
// app.use(express.static(__dirname + '/src'));
app.set('trust proxy', 1);
//app.set('trust proxy', 1);
app.set('views', __dirname + '/public');
// app.set('views', __dirname + '/public');
app.all('/*', function(req, res){
    res.status(400).send('404 ERROR!');
});
// app.all('/*', function(req, res){
//     res.status(400).send('404 ERROR!');
// });
app.listen(3000);
// app.listen(3000);