
exports.getLogin = (req, res, next) => {

   const isLoggedIn = req.get("Cookie").split("=")[1] === "true";

    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isLoggedIn: isLoggedIn,
        activeLogin: true,
        authCSS: true,
        formsCSS: true
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly')
    res.redirect('/');
};


