const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin")


router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getAdminProducts);

router.post("/add-product", adminController.postProducts); 
 


// router.post("/clear",adminController.postClearProducts);


module.exports = router;