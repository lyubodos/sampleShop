const users = [];

const Product = require("../models/products");


getHome = (req, res, next) => {
        res.render("shop/home", {
        pageTitle: "Home",
        path: "/",
        activeHome: true,
        productCSS: true
    });
}

getShop = (req, res, next) => {

    Product.fetchAll(products => {

        res.render("shop/shop", {
            pageTitle: "Shop",
            prods: products,
            path: "/",
            hasProducts: products.length > 0,
            activeProducts: true,
            productCSS: true
        });
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
    });
}



getCart = (req, res, next) => {
    Product.fetchAll(products => {

    res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        prods: products,
        hasProducts: products.length > 0,
        activeCart: true,
        productCSS: true,
    });


    }); 
}




getCart = (req, res, next) => {
    Product.fetchAll(products => {

    res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        prods: products,
        hasProducts: products.length > 0,
        activeCart: true,
        productCSS: true,
    });


    }); 
}

getCheckout = (req, res, next) => {
    Product.fetchAll(products => {

    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
        prods: products,
        hasProducts: products.length > 0,
        activeCheckout: true,
        productCSS: true,
    });


    }); 
}


/*Proto code
postClearProducts = (req, res, next) => {
  
        // Product.clear(products => {
        //     while(products > 0){
        //         products.pop();
        //     }

        //     res.redirect("/")
        // });
    console.log("Products have been cleared");
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
*/



module.exports = {
    getShop,
    getAddProduct,
    getHome,
    getCart,
}


