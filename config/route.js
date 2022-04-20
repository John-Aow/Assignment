const router = require("express").Router();
const productRoutes = require('../api/product/routes')
const orderRoutes = require('../api/order/routes')

router.use(productRoutes);
router.use(orderRoutes);

module.exports = router;
