

var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var session = require('express-session');
//var FileStore = require('session-file-store')(session);
var passport = require('passport');
//var authenticate = require('./authenticate');
var config = require('./config');
const mongoose = require('mongoose');

const Info = require('../models/info');

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log("Connected correctly to database ");
},(err)=>{console.log(err);});

//var indexRouter = require('../routes/index');
//var usersRouter = require('../routes/users');
var infoRouter = require('../routes/infoRouter');
var app = express();
const port = process.env.PORT || 3000;

//Secure traffic only



// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());
//app.use(passport.session());
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.use('/infos',infoRouter);
app.get('*',(req,res)=>{
  res.statusCode = 404;

  res.send('404 Page Not Found');
})


// catch 404 and forward to error handler
app.listen(port, ()=>{
    console.log(`Server is listening at port ${port}`);
})

module.exports = app;