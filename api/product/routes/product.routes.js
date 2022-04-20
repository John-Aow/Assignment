var express = require('express');

var router = express.Router();
const controller = require('../controllers/product.controller')


router.route('/')
    .get(controller.list);


module.exports = router