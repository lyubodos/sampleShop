const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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


// const mongoDb = require("mongodb");
// const getDb = require("../util/database").getDb;

// const ObjectId = mongoDb.ObjectId;

// class User {
//     constructor(userName, email, cart, id) {
//         this.userName = userName;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }


//     save() {
//         const db = getDb();

//         return db.collection('users')
//             .insertOne(this)
//     }


//     addToCart(product) {
//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             return cp.productId.toString() === product._id.toString();
//         });

//         let newQty = 1;
//         const updatedCartItmes = [...this.cart.items];


//         if (cartProductIndex >= 0) {
//             newQty = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItmes[cartProductIndex].quantity = newQty;
//         } else {
//             updatedCartItmes.push({ productId: new ObjectId(product._id), quantity: newQty });
//         }

//         const updatedCart = {
//             items: updatedCartItmes
//         };


//         const db = getDb();

//         return db.collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: updatedCart } });
//     }

//     getOrders() {
//         const db = getDb();

//         return db
//             .collection('orders')
//             .find({ 'user._id': new ObjectId(this._id) })
//             .toArray();
//     }



//     addOrder() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: new ObjectId(this._id),
//                         userName: this.userName
//                     }
//                 };
//                 return db.collection('orders').insertOne(order);
//             })
//             .then(result => {
//                 this.cart = { items: [] };

//                 return db
//                     .collection('users')
//                     .updateOne(
//                         { _id: new ObjectId(this._id) },
//                         { $set: { cart: { items: [] } } }
//                     );
//             });
//     }



//     getCart() {
//         const db = getDb();

//         const productIds = this.cart.items.map(i => {
//             return i.productId;
//         });

//         return db.collection('products')
//             .find({ _id: { $in: productIds } })
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     };
//                 })
//             });
//     }




//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(i => {
//             return i.productId.toString() !== productId.toString();
//         });

//         const db = getDb();

//         return db.collection('users')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 { $set: { cart: { items: updatedCartItems } } }
//             );
//     }

//     static findById(userId) {
//         const db = getDb();

//         return db.collection('users')
//             .findOne({ _id: new ObjectId(userId) })
//             .then(user => {
//                 console.log(user);
//                 return user;
//             })
//             .catch(err => console.log(err))
//     }

// }

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

module.exports = mongoose.model("User", userSchema)