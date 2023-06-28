const express = require("express");
const cartController = require("../controllers/Cart");
const router = express.Router();

router.post("/cart",cartController.cartInfo);

router.post("/cart/add",cartController.cartInfoAdd);

router.post("/delete",)

module.exports = router;