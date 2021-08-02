const users = [];

const Product = require("../models/products");


getShop = (req, res, next) => {
    const products =  Product.fetchAll();

        res.render("shop", {
        pageTitle: "Shop",
        prods: products,
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}



getAddProduct = (req, res, next) => {
    const products = Product.fetchAll();

    res.render("add-product", {
        pageTitle: "Add Product",
        path: '/admin/add-product', 
        prods: products,
        hasProducts: products.length > 0,
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true
    });
}  

getUsers = (req, res, next) => {
    res.render("users", {
        pageTitle: "Users",
        path: "/users",
        hasUsers: users.length > 0,
        activeUsers: true,
        productCSS: true,
        users: users
    })
}

postProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

postClearProducts = (req, res, next) =>{
    const products = Product.fetchAll();

    while(products.length > 0){
        products.pop();
    }

    res.redirect("/");
};

postUsers = (req, res, next) => {
    users.push(req.body.userName)
    console.log(users);
    res.redirect("/users");
}

clearUsers = (req, res, next) => {
    while (users.length > 0) {
        users.pop();
    }

    console.log(users);
    res.redirect("/users");
}

pageNotFound = (req, res, next) => {
    res.status(404)
    .render("404", {
        pageTitle: "Page Not Found",
    });
}

module.exports = {
    clearUsers,
    getShop,
    getAddProduct,
    postProducts,
    postClearProducts,
    getUsers,
    postUsers,
    pageNotFound
}


