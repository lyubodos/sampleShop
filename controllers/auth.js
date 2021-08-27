
exports.getLogin = (req, res, next) => {
    console.log(req);

    const isLoggedIn = 
    req.get('Cookie')
    .split(';')[0]
    .trim()
    .split("=")[1];

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
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}

