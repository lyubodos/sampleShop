const Product = require("../models/product");
const Order = require("../models/order");

getHome = (req, res, next) => {
    res.render("shop/home", {
        pageTitle: "Home",
        path: "/",
        activeHome: true,
        productCSS: true
    });
};


//Shop controllers
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
                isLoggedIn: isLoggedIn,
                activeProducts: true,
                productCSS: true
            });
        });
};



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
};



deleteProdCart = (req, res, next) => {
    const prodId = req.body.productId;

    req.user
    .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err))
};


//Cart controllers
getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            let products = user.cart.items.map(items => items.toJSON()).sort((a, b) =>{
                return a.productId.title.localeCompare(b.productId.title);
            })

            console.log(products)
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
};
 

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

};



//Order controllers
getOrders = (req, res, next) => {
    Order.find({"user.userId": req.user._id})
    .then(orders =>{
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders,
            hasOrders: orders.length > 0,
            acriveOrders: true
          });
    }).catch(err => console.log(err));
};

postOrder = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        let products = user.cart.items.map(i => {
            return { quantity: i.quantity, product: {...i.productId._doc} };
        });

        const order = new Order({
            products: products,

            user: {
                name: req.user.name,
                userId: req.user
            }
            
        });

        return order.save();
    })
    .then(result => {
        res.redirect("/orders");
    })
    .catch(err => console.log(err))
};


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
};


