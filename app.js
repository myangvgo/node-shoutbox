var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');

// import routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var entriesRouter = require('./routes/entries');
var apiRouter = require('./routes/api');

// import middleware
var messages = require('./middleware/messages');
var user = require('./middleware/user');
var page = require('./middleware/page');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // use cookie
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.methodOverride());
// use method override to add support for PUT / DELETE via 'HTML form' submission
// use a header to override the method
app.use(methodOverride());

// app.use(express.cookieParser()); // cookieParser is not part of express which need to install separately

// use session, placed after cookie
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    })
);

// use custom middlewares
app.use(user);
app.use(messages); // not app.use(messages());
app.use(page);

// use routes
app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', entriesRouter); // user posts route
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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

// output server staring info
var port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server staring on port ${port}`);
});

module.exports = app;
