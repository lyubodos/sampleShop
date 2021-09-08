const express = require("express");
const { check, body } = require("express-validator/check");

const router = express.Router();

const authController = require("../controllers/auth");
const user = require("../models/user");


router.get("/signup", authController.getSignUp);
router.post("/signup", [
check('email')
.isEmail()
.withMessage("Please enter a valid email."),
body('password').isLength( {min: 5} ).withMessage("Please enter a password with 5 or more characters.").isAlphanumeric() 
],

authController.postSignUp);

router.get("/login", authController.getLogin);
router.post('/login', [
body('email')
.isEmail()
.withMessage("Please enter a valid e-mail address!"),
body('password')
.isLength({min: 5})
.withMessage("Password should be at least 5 characters long.")
.isAlphanumeric()
],

authController.postLogin);


router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);


module.exports = router;

