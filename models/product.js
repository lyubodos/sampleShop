const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const productSchema = new Schema({
  title: String,
  imageUrl : String,
  description: String,
  price: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});


module.exports = mongoose.model('Product', productSchema);