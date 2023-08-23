const mongoConnectimport = require("../../../util/database");
const monogodb = require("mongodb");

exports.setorderstatus = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    const id = req.params.id;

    const status = req.body.status;

    db.collection('orders').updateOne({ _id: new monogodb.ObjectId(id) }, { $set: { status: status } }).then(response => res.status(200).json(response));
}