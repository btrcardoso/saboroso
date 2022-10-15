var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require('formidable');
require('dotenv').config();

// connect-redis setup
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();


app.use(function(req, res, next){

  if(req.method === 'POST'){

    // upload of the forms
    // __dirname: folder where the app is running 
    var form = formidable({
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true
    });

    form.parse(req, function(err, fields, files){

      req.fields = fields;
      req.files = files;
      next();

    });

  } else {
    next();
  }

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,                         // if the session wasn't utilized, but we want save in db
    secret: process.env.SESSION_PASSWORD, 
    resave: true,                                    // if the session finalize, a new session is created and saved                       
  })
);
/*
// code utilized in the tutorial of Class "MY14 - Express Session com Redis"
require('dotenv').config();
app.use(session({
  store: new RedisStore({
    host: process.env.HOST,
    port: process.env.SESSION_PORT //6379
  }),
  secret: process.env.SESSION_PASSWORD,
  resave: true, 
  saveUninitialized: true 
}));
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
