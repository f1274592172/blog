const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
// 注册session中间件
app.use(session({
        secret: '这是加密的密钥',
        resave: false,
        saveUninitialized: false
    }))
    // 设置模板目录
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/node_modules', express.static('./node_modules'));
// 获取表单内容中间件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// 循环导入路由模块
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
    if (err) return console.log('读取 router 目录中的路由失败！')
    filenames.forEach(fname => {
        const router = require(path.join(__dirname, './router', fname))
        app.use(router)
    })
})
app.listen(80, () => {
    console.log('server running at http://127.0.0.1');
})