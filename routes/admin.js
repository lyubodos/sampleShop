const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin")


router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getAdminProducts);

router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product/:productId", adminController.postEditProduct);


router.post("/add-product", adminController.postProducts); 
router.post("/delete-product", adminController.postDeleteProd);



module.exports = router;