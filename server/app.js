const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('LetsChat');
const mongoose = require('mongoose');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io').listen(httpServer);
const webpack = require('webpack');
const webpackMiddleware = require("webpack-dev-middleware");
app.use(webpackMiddleware(webpack({
    entry: "...",
    output: {
        path: "/"
    }
}), {
    noInfo: false,
    quiet: false,
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: "/public/",
    index: "index.html",
    headers: { "X-Custom-Header": "yes" },
    mimeTypes: { "text/html": [ "phtml" ] },
    stats: {
        colors: true
    },
    reporter: null,
    serverSideRender: false,
}));

const Message = require('./models/message.js');
const Room = require('./models/Room.js');
const User = require('./models/User.js');

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

app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', "http://" + req.headers.host);
        next();
    }
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

const onlineUsers = {}; //存储在线用户列表的对象


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


io.sockets.on('connection', (socket) => {

    //有人上线
    socket.on('login', (data) => {
        // 将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
        socket.name = data.user;
        socket.roomId = data.roomId;
        // onlineUsers 对象中不存在该用户名则插入该用户名
        if (!onlineUsers[data.user]) {
            onlineUsers[data.user] = data.user;
        }
    });

    // 有人说话
    socket.on('say', (data) => {
        const roomId = data.roomId;
        const clients = io.sockets.clients();
        // 遍历找到该聊天室的用户
        clients.forEach(function (client) {
            if (client.roomId === roomId) {
                client.emit('say', data.message);
            }
        });
    });


    //有人下线
    socket.on('disconnect', function() {
        // 若 onlineUsers 对象中保存了该用户名
        if (onlineUsers[socket.name]) {
            delete onlineUsers[socket.name];
        }
    });
});


module.exports = app;
