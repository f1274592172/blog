const conn = require('../db/index.js');
const moment = require('moment');
const marked = require('marked');
getAddPage = (req, res) => {
    if (!req.session.islogin) return res.redirect('/');
    res.render('./article/add.ejs', { user: req.session.user, islogin: req.session.islogin })
}

addArticle = (req, res) => {
    const sql = 'insert into article set ?';
    req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
    conn.query(sql, req.body, (err, result) => {
        if (err) return res.send({ msg: '发布错误！', status: 502 });
        if (result.affectedRows != 1) return res.send({ msg: '发布文章失败！', status: 503 });
        res.send({ msg: '发布成功', status: 200, insertId: result.insertId })
    })
}
getInfoPage = (req, res) => {
    conn.query('select * from article where id = ?', req.params.id, (err, result) => {
        if (err) return res.send({ msg: '查询出错！', status: 502 });
        if (result.length !== 1) return redirect('/');
        // 转换md文档为文本格式
        const html = marked(result[0].content);
        result[0].content = html;
        res.render('./article/info.ejs', { user: req.session.user, islogin: req.session.islogin, article: result[0] })
    })

}
editArticle = (req, res) => {
    res.render('./article/edit.ejs', { user: req.session.user, islogin: req.session.islogin });
}
module.exports = {
    getAddPage,
    addArticle,
    getInfoPage,
    editArticle
}