// 导入时间格式包
const moment = require('moment');
// 引入数据库连接获得conn连接对象
const conn = require('../db/index.js');

module.exports = {
    getIndex: (req, res) => {
        conn.query('select * from article left join users on article.userid  = users.id', (err, result) => {
            if (err) {
                res.render('index.ejs', { islogin: req.session.islogin, user: req.session.user, articles: [] });
            } else {
                res.render('index.ejs', { islogin: req.session.islogin, user: req.session.user, articles: result });
            }
        })
    },
    getLogin: (req, res) => {
        res.render('./user/login.ejs');
    },
    getRegister: (req, res) => {
        res.render('./user/register.ejs');
    },
    register: (req, res) => {
        req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        const sql = 'select count(*) as count from users where username = ?';
        conn.query(sql, req.body.username, (err, result) => {
            if (err) return res.send({ msg: '查重失败', status: cv502 });
            if (result[0].count == 1) return res.send({ msg: '用户名已存在，请重新输入！', status: 503 });
            const addSql = 'insert into users set ?';
            conn.query(addSql, req.body, (err, result) => {
                if (err) return res.send({ msg: '添加出错', status: 504 });
                if (result.affectedRows == 1) res.send({ msg: '注册成功！', status: 200 })
            })
        })
    },
    login: (req, res) => {
        const sql = 'select * from users where username = ? and password = ?';
        conn.query(sql, [req.body.username, req.body.password], (err, results) => {
            if (err) return res.send({ status: 503, msg: '登陆出错!' })
            if (results.length !== 1) {
                return res.send({ msg: '用户名或密码错误！', status: 502 })
            }
            req.session.user = results[0];
            req.session.islogin = true;
            res.send({ msg: '登陆成功', status: 200 });
        })
    },
    // 注销
    logout: (req, res) => {
        req.session.destroy(function() {
            // 使用 res.redirect 方法，可以让 客户端重新访问 指定的页面
            res.redirect('/')
        })
    }
}