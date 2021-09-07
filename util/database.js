const mongoDb = require("mongodb");
const MongoClient = mongoDb.MongoClient;

let _db;

//myFirstDatabase

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://Ithienne:Denica2400@cluster0.b6xr5.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        cb();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
    
};

const getDb = () => {
    if(_db){
        return _db;
    }
    
    throw 'No Databata found!!!';
};


module.exports = {
    mongoConnect,
    getDb
}