var express = require('express');
var app = express();
const serveIndex = require('serve-index');

const DatabaseOperation = require('../db/connent');

var home = require('./home')
var user = require('./user')

module.exports = {
    start: function (_port) {

        app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", ' 3.2.1')
            if (req.method == "OPTIONS") {
                res.send(200); /*让options请求快速返回*/
            } else {
                next();
            }
        });

        home.register(app, DatabaseOperation);
        user.register(app, DatabaseOperation);

        // ----- 配置静态资源托管 -----
        // 静态目录
        app.use('/', serveIndex(__dirname, { 'icons': true }));
        app.use('/', express.static(__dirname));


        app.listen(_port, () => {
            console.log(`Server running at ${_port}`);
        });
    }
}