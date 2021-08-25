//Seting variable for the core modules 
const path = require("path");
const fs = require("fs");

//Seting variables for express/express libraries
const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const envValues = require("./envVal");

//Piping routers from their dirs
const adminRouter = require("./routes/admin");
const homeRouter = require("./routes/home");


//Piping controller for the products
const errorController = require("./controllers/error");

const mongoose = require("mongoose");


const User = require("./models/user");


const app = express();


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


//Seting current user
app.use((req, res, next) => {
    User.findById("6124ff294543b7cf410d2e9d")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
});


//Calling diferent routers
app.use(homeRouter);
app.use("/admin", adminRouter);
app.use(errorController.error404);



//Core server deployment (MongoDB)
mongoose
    .connect('mongodb+srv://Ithienne:Denica2400@cluster0.b6xr5.mongodb.net/shop?retryWrites=true&w=majority',{useNewUrlParser: true} )
    .then(result =>{
        
    User.findOne()
    .then(user => {
        if(!user){const user = new User({
            name: "Lyubomir",
            email: 'lyubomir.vas@test.cc',
            cart: {
                items: []
            }
        });

        user.save();
        }
    });
    app.listen(3000);
    console.log("Connected!");

}).catch(err => console.log(err));