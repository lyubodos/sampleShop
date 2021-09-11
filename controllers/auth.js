const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/user");

const { validationResult } = require("express-validator/check");

exports.getLogin = (req, res, next) => {

  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }

  res.render('auth/login', {
    pageTitle: "Login",
    path: "/login",
    isAuth: false,
    errorMessage: message,
    activeLogin: true,
    authCSS: true,
    formsCSS: true
  });
};
 

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);

  if(!errors.isEmpty()){

    return res.render('auth/login', {
      pageTitle: "Login",
      path: "/login",
      isAuth: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
       
      },
      activeLogin: true,
      authCSS: true,
      formsCSS: true
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password provided.');
        return res.redirect("/login");
      };

      return bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true,
            req.session.user = user;
            console.log(req.session.user);
            res.redirect("/");
        
          }
          req.flash('error', 'Invalid email or password provided.');
          return res.redirect('/login');
        })
        .catch(err => {
          res.redirect('/login');
        })

  
    })

    .catch(err => console.log(err))
};


exports.getSignUp = (req, res, next) => {

  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }

  res.render("auth/signup", {
    pageTitle: "Sign Up",
    path: "/signup",
    errorMessage: message,
    valErrors: [],
    activeSignUp: true,
    authCSS: true,
    formsCSS: true
  });
};


exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req);


  
  if(!errors.isEmpty()){

    console.log(errors.array());

    return res.status(422)
    .render("auth/signup", {
      pageTitle: "Sign Up",
      path: "/signup",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword
      },
      valErrors: errors.array(),
      activeSignUp: true,
      authCSS: true,
      formsCSS: true
    })
  }

  User.findOne({ email: email })
    .then(userDoc => {

      if (userDoc) {
        req.flash('error', 'User already exists!');
        return res.redirect('/signup');
      } else if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match! Please make sure that both passwords match.');
        return res.redirect('/signup');
      } else if (password === "" || confirmPassword === "") {
        req.flash('error', 'Password fields cannot be empty!');
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


exports.getReset = (req, res, next) => {

  let message = req.flash('error');

  if (message.length > 0) {
    message = message[0]
  } else {
    message = null;
  }
  res.render("auth/pass_reset", {
    pageTitle: "Password reset",
    path: "/pass-reset",
    errorMessage: message,
    isAuth: false,
    formsCSS: true,
    
  });
}

// reseting the password via an e-mail link
exports.postReset = (req, res, next) => {
    const email = req.body.email;

    crypto.randomBytes(32, (err, buffer) => {
      if(err) {
        console.log(err);
        return res.redirect("/reset");
      }

      const token = buffer.toString('hex');
      
      User.findOne({email: email})
      .then(userDoc => {
          if(userDoc) {
            req.flash("error", "User with that account not found!");
            return res.redirect("/reset");
          }

          userDoc.resetToken = token;
          userDoc.resetTokenExpiration = Date.now() + 3600000;

          return user.save();

      })
      .catch(err => {
        console.log(err);
      })
    
    });
}