const Product = require("../models/product");


getAddProduct = (req, res, next) => {
    const editMode = req.query.edit;

    let products = [];
        res.render("admin/edit-product", {
            pageTitle: "Add Product",
            path: '/admin/add-product',
            prods: products,
            hasProducts: products.length > 0,
            editing: editMode,
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
   
}

postProducts = (req, res, next) => {

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    
    const product = new Product(title, imageUrl, description, price);

    product.save()
    .then(result => {
        console.log("Product created");
        res.redirect("/admin/products");
    })
    .catch(err =>{
        console.log(err);
    });

};

getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect("/");
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
    .then(product => {
        if(!product){
            return res.redirect("/");
        }

        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: '/admin/edit-product',
            editing: editMode,
            formsCSS: true,
            productCSS: true,
            product: product
        });
    });

     

        
}

postEditProduct = (req, res, next) => {
        const prodId = req.body.productId;
        
        const uptitle = req.body.title;
        const upimageUrl = req.body.imageUrl;
        const upprice = req.body.price;
        const updescription = req.body.description;

        const upProduct = new Product(prodId, uptitle, upimageUrl, updescription, upprice);

        upProduct.save();
        res.redirect("/admin/products");
    }

    
getAdminProducts =  (req, res, next) =>  {
        Product.fetchAll()
        .then(products => {
            res.render("admin/product-list", {
                pageTitle: "Admin Products",
                prods: products,
                path: "/products",
                hasProducts: products.length > 0,
                activeAdmProducts: true,
                productCSS: true
            });
        })
  
}


postDeleteProd = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteById(prodId);
    res.redirect("/admin/products");
}


module.exports = {
    postProducts,
    getAddProduct,
    getAdminProducts,
    getEditProduct,
    postEditProduct,
    postDeleteProd
}