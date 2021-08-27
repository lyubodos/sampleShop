const User = require("../models/user");


exports.getLogin = (req, res, next) => {
  
    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isAuth: false,
        activeLogin: true,
        authCSS: true,
        formsCSS: true
    });
};

exports.postLogin = (req, res, next) => {    
    User.findById("6124ff294543b7cf410d2e9d")
    .then(user => {
        req.session.isLoggedIn = true,
        req.session.user = user;
        console.log(req.session);
        res.redirect("/");
    })
    .catch(err => console.log(err))
};



exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        
        res.redirect("/");
    });
};