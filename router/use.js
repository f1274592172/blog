const express = require('express');
const app = express();
const router = express.Router();
const ctrl = require('../controller/index.js');
// 登陆页面
router.get('/login', ctrl.getLogin);
// 注册页面
router.get('/register', ctrl.getRegister);
// 注册
router.post('/register', ctrl.register);
// 登陆
router.post('/login', ctrl.login);
// 注销
router.get('/logout', ctrl.logout);

module.exports = router;