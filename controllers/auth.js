
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        activeLogin: true,
        authCSS: true,
        formsCSS: true
    });

};

exports.postLogin = (req, res, next) => {
    req.isLoggenIn = true;
    res.redirect('/');
}

