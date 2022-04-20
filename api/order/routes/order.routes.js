var express = require('express');

var router = express.Router();
const controller = require('../controllers/order.controller')


router.route('/')
    .post(controller.create)
    

router.route('/admin')
    .get(controller.list)


module.exports = router