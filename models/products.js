const fs = require("fs");
const path = require("path");

const products = [];

const rootDir = require("../util/path");

const p = path.join(rootDir, 
    'data', 
    'products.json'
);

module.exports = class Product {

        constructor(title, imageUrl, description, price){
            this.title = title;
            this.imageUrl = imageUrl;
            this.description = description;
            this.price = price;
        }

        
        save() {
            fs.readFile(p, (err, fileContent) => {
                let products = [];
                
                if(!err) {
                    products = JSON.parse(fileContent)
                }

                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            });
        }

        static clear(cb){

            fs.readFile(p, (err, fileContent) => {
                if(err){
                    cb([]);
                }

                let products;
                
                while(products.length > 0) {
                    products.pop();
                }
                
                products = JSON.parse(fileContent);
               fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            });

        }

        static fetchAll(cb) {

            fs.readFile(p, (err, fileContent) => {
                if(err){
                   cb([]);
                }

                cb(JSON.parse(fileContent));
            })

        }
}       