const bcrypt = require("bcrypt");


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
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if(!user){
              return res.redirect("/login")
            }
            
            bcrypt
            .compare(password, user.password)
            .then(doMatch => {
              if(doMatch){
                return res.redirect("/");
              }
              return res.redirect('/login');
            })
            .catch(err => {
              res.redirect('/login');
            })

            req.session.isLoggedIn = true,
            req.session.user = user;
            console.log(req.session.user);
            res.redirect("/");
        })

        .catch(err => console.log(err))
};


exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        pageTitle: "Sign Up",
        path: "/signup",
        isAuth: false,
        activeSignUp: true,
        authCSS: true,
        formsCSS: true
    });
};


exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          return res.redirect('/signup');
        }

        return bcrypt.hash(password, 12)
        .then(hashedPass => {
          const user = new User({
            email: email,
            password: hashedPass,
            cart: { items: [] }
          });

          console.log(user)
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        });
      })
      .catch(err => {
        console.log(err);
      });
};



exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect("/");
    });
};

