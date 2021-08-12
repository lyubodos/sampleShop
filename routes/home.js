const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getHome);
router.get("/cart", shopController.getCart);
router.get("/products", shopController.getShop);




module.exports = router;