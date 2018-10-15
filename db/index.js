const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'heima_blog'
});
// 暴露出去
module.exports = conn;