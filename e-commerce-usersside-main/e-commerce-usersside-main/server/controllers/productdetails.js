const mongodb = require('mongodb');

const dbimport = require('../util/database');

exports.getProductdetails = (req, res, next) => {

    const prodId = req.params.id;

    const db = dbimport.getDb();

    db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) })
        .then(result => { res.status(200).json(result) }).catch(err => console.log(err));
}