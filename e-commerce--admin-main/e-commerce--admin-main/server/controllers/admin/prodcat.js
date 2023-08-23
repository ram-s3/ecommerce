const mongoConnectimport = require("../../util/database");

exports.getprodcat = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    db.collection('product_categories').find().toArray().then(categories => res.json(categories));
}