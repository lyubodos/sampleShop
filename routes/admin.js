const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");


router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", isAuth, adminController.getAdminProducts);

router.get("/edit-product/:productId", isAuth,  adminController.getEditProduct);
router.post("/edit-product/:productId", isAuth, adminController.postEditProduct);


router.post("/add-product", isAuth, adminController.postProducts); 
router.post("/delete-product", isAuth,  adminController.postDeleteProd);




module.exports = router;