const express = require('express');
const router = express.Router();
const ctrl = require('../controller/index.js');
// 访问首页
router.get('/', ctrl.getIndex);
module.exports = router;