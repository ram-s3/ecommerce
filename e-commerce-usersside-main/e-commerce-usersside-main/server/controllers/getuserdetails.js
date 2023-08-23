const mongodb = require("mongodb");
const mongoConnectimport = require("../util/database");


exports.userdetails = (req, res, next) => {

    const userid = req.params.id;

    const db = mongoConnectimport.getDb()

    db.collection('users').findOne({ _id: new mongodb.ObjectId(userid) }).then(user => res.status(200).json(user));

}