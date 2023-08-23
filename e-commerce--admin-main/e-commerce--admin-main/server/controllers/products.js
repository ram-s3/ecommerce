const mongoConnectimport = require('../util/database');

exports.getProducts = (req, res, next) => {

    // console.log(getDb());
    const db = mongoConnectimport.getDb();
    db.collection('products').find().toArray()
        .then(data => {


            res.status(200).json(data);

        });

}

