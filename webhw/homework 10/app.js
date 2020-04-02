'use strict';

var express = require('express');
var jade = require('jade');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var route = require('./route.js');
var app = express();
var MongoStore = require('connect-mongo')(session);

app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'van',
    cookie: {secure: false},
	store: new MongoStore({
        url: 'mongodb://localhost:27017/'
    })
}));
app.use('/static', express.static(__dirname+'/public'));

route(app);

app.listen(8000, "localhost");

console.log('Server running on http://localhost:8000');