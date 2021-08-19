const mongoDb = require("mongodb")
const getDb = require("../util/database").getDb;

const Cart = require("./cart");



class Product {

    constructor(title, imageUrl,  description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then(res =>{
          console.log(res);
        })
        .catch(err =>{
          console.log(err);
        })
    }

    static fetchAll(){
      const db = getDb();

        return db.collection('products').find().toArray()
        .then(prods =>{
          console.log(prods);
          return prods;
        })
        .catch(err => console.log(err))

    }

    static findById(id) {
      const db = getDb();

      return db.collection('products')
      .find({ _id: new mongoDb.ObjectId(id)})
      .next()
      .then(product => {
        return product;
      })
      .catch(err => console.log(err))
    }

}





module.exports = Product;