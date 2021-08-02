const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const envValues = require("./envVal");

const adminRouter = require("./routes/admin");
const homeRouter = require("./routes/home");
const userRouter = require("./routes/users");

const productsController = require("./controllers/products")


const app = express();

app.engine("hbs", expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: "hbs"
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter);
app.use("/admin", adminRouter);
app.use(userRouter);

app.use(productsController.pageNotFound);


app.listen(envValues.port, () => {
    console.log(`Server is runing on port ${envValues.port}.`);
});
