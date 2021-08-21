const mongoDb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongoDb.ObjectId;

class User {
    constructor(userName, email, cart, id) {
        this.userName = userName;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }


    save() {
        const db = getDb();

        return db.collection('users')
            .insertOne(this)

    }


    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        let newQty = 1;
        const updatedCartItmes = [...this.cart.items];

        console.log(cartProductIndex);

        if (cartProductIndex >= 0) {
            newQty = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItmes[cartProductIndex].quantity = newQty;
        } else {
            updatedCartItmes.push({ productId: new ObjectId(product._id), quantity: newQty });
        }

        const updatedCart = {
            items: updatedCartItmes
        };


        const db = getDb();

        return db.collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDb();

        const productIds = this.cart.items.map(i => {
            return i.productId;
        });

        return db.collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                })
            });
    }

    deleteItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(i => {
            return i.productId.toString() !== productId.toString();
        });

        const db = getDb();

        return db.collection('users')
            .updateOne(
                { _id: new ObjectId(this._id) },
                { $set: { cart: { items: updatedCartItems } }}
            );
    
    }

    static findById(userId) {
        const db = getDb();

        return db.collection('users')
            .findOne({ _id: new ObjectId(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => console.log(err))
    }

}



module.exports = User;