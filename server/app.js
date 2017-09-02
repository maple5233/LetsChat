const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('LetsChat');
const mongoose = require('mongoose');
const app = express();

const config = require('./config');
const index = require('./routes/index');
const users = require('./routes/users');

// 连接数据库
config.on('error', () => {
    debug('连接数据库未成功!');
});
config.once('open', () => {
    debug('连接数据库成功!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({
        err: err.toString(),
        status: err.status || 500
    }).end();
});

module.exports = app;
