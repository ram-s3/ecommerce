const mongoConnectimport = require("../../util/database");
const mongodb = require("mongodb");

exports.deleteproduct = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    db.collection("products").deleteOne({ _id: new mongodb.ObjectId(req.params.id) }).then(response => res.status(200).json(response));

}