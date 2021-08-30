//Seting variable for the core modules 
const path = require("path");
const fs = require("fs");

//Seting variables for express/express libraries
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const envValues = require("./envVal");

//Piping routers from their dirs
const adminRouter = require("./routes/admin");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");


//Piping controller for the products
const errorController = require("./controllers/error");

const mongoose = require("mongoose");


const User = require("./models/user");


//Creating a ref for the database path which can be used more than once
const MONGODB_URI = 'mongodb+srv://Ithienne:Trats12@cluster0.b6xr5.mongodb.net/shop';


const app = express();


const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});


//Calibrating view-engine's(Handlebars) extension type and directory path
app.engine("hbs", expressHbs({
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main-layout',
  partialsDir: ['views/base', "views/shop"],
  extname: "hbs"
}));


//Setting the view egine type and pathing
app.set("view engine", "hbs");
app.set("views", "views");


//Adjusting body parsing and delivery of static css files for every render
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


//Creating a session aprehending the express-session with a middleware
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }));


app.use(flash());


//Seting current user
app.use((req, res, next) => { 
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      console.log(user)
      next();
    })
    .catch(err => console.log(err));
});


//Calling diferent routers
app.use(homeRouter);
app.use("/admin", adminRouter);
app.use(authRouter);
app.use(errorController.error404);



//Core server deployment (MongoDB)
mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(envValues.port);
    console.log("Connected!");

}).catch(err => console.log(err));