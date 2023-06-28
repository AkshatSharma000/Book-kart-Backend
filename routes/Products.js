const express = require('express');
const router = express.Router();
const productController = require("../controllers/Products");

router.get('/products',productController.productsGet);

router.post('/products',productController.productsPost);

router.post('/productInfo',productController.productInfo);

router.post('/productUpdate',productController.productUpdate);

router.post('/productBySeller',productController.productBySeller);

router.post('/productInfoSeller',productController.productInfoSeller);

module.exports = router;