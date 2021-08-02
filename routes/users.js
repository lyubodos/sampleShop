const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products")


router.get("/users", productsController.getUsers);
router.post('/users', productsController.postUsers);
router.post('/users-clear', productsController.clearUsers);

module.exports = router;