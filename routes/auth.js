const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");


router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);


router.get("/login", authController.getLogin);
router.post('/login', authController.postLogin);


router.post("/logout", authController.postLogout);


router.get("/reset", authController.getReset);


module.exports = router;