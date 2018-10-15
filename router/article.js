const express = require('express');
const router = express.Router();
const ctrl = require('../controller/article.js');
router.get('/article/add', ctrl.getAddPage);
router.post('/sendArticle', ctrl.addArticle);
router.get('/article/info/:id', ctrl.getInfoPage);
router.get('/editArticle/:id', ctrl.editArticle);
module.exports = router;