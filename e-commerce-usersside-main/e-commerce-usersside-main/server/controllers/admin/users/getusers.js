const mongoConnectimport = require('../../../util/database');

exports.getusers = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    db.collection('users').find().toArray().then(data => res.status(200).json(data))
}