
const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

  

module.exports = class Cart {

    constructor(){

    }

    static addProduct(id, productPrice){
        let cart = {
            products: [],
            totalPrice: 0
        }

        console.log(productPrice);

        fs.readFile(p, (err, fileContent) => {
            if(!err){
                cart = JSON.parse(fileContent);
            }

            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProd;

            if(existingProduct){
                updatedProd = { ...existingProduct};
                updatedProd.qty = updatedProd.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProd;

            } else {

                updatedProd = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProd];

            }
            cart.totalPrice = cart.totalPrice + +productPrice;

            console.log(cart);

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }


    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {

          if(err){
            return;
          }

          const updatedCart = { ...JSON.parse(fileContent)};
          const product = updatedCart.products.find(prod => prod.id === id);
          const productQty = product.qty;
    
          updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
          updatedCart.totalPrice = updatedCart.totalPrice - +productPrice*productQty;
    
    
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
        });
        });
      }


}