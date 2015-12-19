var express = require('express')
  , session = require('express-session')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')

  //route files
  , app = express()
  , routes = require('./routes/base')
  , fs = require('fs');
  
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

//Cookie Params Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Statics
app.use(express.static(path.join(__dirname, '/public')));

//Loggin
app.use(logger('dev'));

//Sessions
app.use(session({ secret: toString(Math.random()), 
  cookie: { maxAge: 60*24*60*60*1000 },
  resave: true,
  saveUninitialized: false
}));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {
  var status = err.status || 500
  res.status(status);
  err = (app.get('env') === 'production') ? err : err;
  res.render(status.toString(), {
    message: err.message,
    error: err
  });
});


module.exports = app;