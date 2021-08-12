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


const app = express();


//Calibrating view-engine's(Handlebars) extension type and directory path
app.engine("hbs", expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    partialsDir: ['views/base', 'views/shop'],
    extname: "hbs"
}));


//Setting the view egine type and pathing
app.set("view engine", "hbs");
app.set("views", "views");


//Adjusting body parsing and delivery of static css files for every render
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, "public")));


//Calling diferent routers
app.use(homeRouter);
app.use("/admin", adminRouter);

app.use(errorController.error404);


//Core server deployment
app.listen(envValues.port, () => {
    console.log(`Server is runing on port ${envValues.port}.`);
});
