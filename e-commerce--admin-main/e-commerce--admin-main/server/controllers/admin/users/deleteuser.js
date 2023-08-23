const mongoConnectimport = require('../../../util/database');
const monogdb = require("mongodb");
exports.deleteuser = (req, res, next) => {


    const db = mongoConnectimport.getDb();

    db.collection('users').deleteOne({ _id: new monogdb.ObjectId(req.params.id) }).then(results => res.status(200).json(results))
}