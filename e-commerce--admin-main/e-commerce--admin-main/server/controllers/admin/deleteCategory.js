
const mongoConnectimport = require('../../util/database')
const mongodb = require("mongodb");



exports.deleteCategory = (req, res, next) => {

    const id = req.params.id;
    const db = mongoConnectimport.getDb();

    db.collection('product_categories').deleteOne({ _id: new mongodb.ObjectId(id) }).then(result => res.status(200).json(result))

}