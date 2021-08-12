const Product = require("../models/products");


postProducts = (req, res, next) => {

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const desc = req.body.desc;

    const product = new Product(title, imageUrl, desc, price);
    product.save();
    res.redirect("/");
};


getAddProduct = (req, res, next) => {
    Product.fetchAll(products => {

        res.render("admin/add-product", {
            pageTitle: "Add Product",
            path: '/admin/add-product',
            prods: products,
            hasProducts: products.length > 0,
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
    })
}

getAdminProducts = (req, res, next) =>{
    Product.fetchAll(products => {

            res.render("admin/product-list", {
                pageTitle: "Admin Products",
                prods: products,
                path: "/products",
                hasProducts: products.length > 0,
                activeAdmProducts: true,
                productCSS: true
            });
        });
}


module.exports  = {
    postProducts,
    getAddProduct,
    getAdminProducts
}