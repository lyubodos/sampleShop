const Product = require("../models/product");
const Cart = require("../models/cart");


getHome = (req, res, next) => {
    res.render("shop/home", {
        pageTitle: "Home",
        path: "/",
        activeHome: true,
        productCSS: true
    });
}

getShop = (req, res, next) => {

    Product.find()
    .lean()
        .then(products => {
            console.log(products)
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


getDetails = (req, res, next) => {
    const prodId = req.params.productId;

    Product.findById(prodId)
        .lean()
        .then(product => {
            console.log(product);
            res.render("shop/item-details", {
                product: product,
                // pageTitle: product.title,
                path: "/products"
            });
        })
        .catch(err => console.log(err));
}




getCart = (req, res, next) => {

    req.user
        .getCart()
        .then(products => {
            res.render("shop/cart", {
                pageTitle: "Cart",
                path: "/cart",
                prods: products,
                hasProducts: products.length > 0,
                activeCart: true,
                productCSS: true,
            });
        })
        .catch(err => console.log(err));
}
 

postCart = (req, res, next) => {

    const prodId = req.body.productId;

    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))

}


getOrders = (req, res, next) => {
    req.user
      .getOrders()
      .then(orders => {
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders: orders,
          hasOrders: orders.length > 0,
          acriveOrders: true
        });
      })
      .catch(err => console.log(err));
};


postOrder = (req, res, next) => {
    
    req.user
    .addOrder()
    .then(result => {
        res.redirect("/orders");
    })
    .catch(err => console.log(err))
}


deleteProdCart = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
    .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
}


module.exports = {
    getShop,
    getAddProduct,
    getHome,
    getCart,
    getDetails,
    deleteProdCart,
    postCart,
    getOrders,
    postOrder
}


