const mongoConnectimport = require('../../../util/database');

exports.getorders = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    db.collection('orders').find().toArray().then(data => res.status(200).json(data))
}