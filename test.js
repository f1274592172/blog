const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/index?name=2', (req, res) => {
    console.log(req.body);
    console.log(swswdswswseweweswsewsqwxsza)
        // console.log(req.params.name);
})
app.listen(80, (req, res) => {
    console.log('server running at http://127.0.0.1');
})