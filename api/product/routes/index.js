const router = require("express").Router();
const shirtRoutes = require('./product.routes');



router.use('/product', shirtRoutes);



module.exports = router;