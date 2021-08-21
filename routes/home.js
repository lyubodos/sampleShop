const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");


router.get("/", shopController.getHome);
router.get("/cart", shopController.getCart);
router.get("/products", shopController.getShop);
router.get("/products/:productId", shopController.getDetails);


router.post("/cart-delete-item", shopController.deleteProdCart)


module.exports = router;