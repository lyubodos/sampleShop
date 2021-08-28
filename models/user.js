const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});


userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    let newQty = 1;
    const updatedCartItmes = [...this.cart.items];


    if (cartProductIndex >= 0) {
        newQty = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItmes[cartProductIndex].quantity = newQty;
    } else {
        updatedCartItmes.push({ 
            productId: product._id, 
            quantity: newQty 
        });
    }

    const updatedCart = {
        items: updatedCartItmes
    };


    this.cart = updatedCart;
    return this.save();
};


userSchema.methods.removeFromCart = function(productId) { 
    const updatedCartItems = this.cart.items.filter(i => {
                    return i.productId.toString() !== productId.toString();
                });   

    this.cart.items = updatedCartItems;
    return this.save();
};


module.exports = mongoose.model("User", userSchema);