const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

const isAuth = require("../middleware/is-auth");


router.get("/", shopController.getHome);
router.get("/cart", isAuth,  shopController.getCart);
router.get("/products", shopController.getShop);
router.get("/products/:productId", isAuth, shopController.getDetails);
router.get("/orders", isAuth, shopController.getOrders)

router.post("/add-to-cart", shopController.postCart);
router.post("/cart-delete-item", shopController.deleteProdCart);
router.post("/add-order", shopController.postOrder);



module.exports = router;