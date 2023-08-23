const mongoConnectimport = require('../util/database');

exports.getProducts = (req, res, next) => {

    // console.log(getDb());
    const db = mongoConnectimport.getDb();
    db.collection('products').find().project({ name: 1, price: 1, images: 1, description: 1 }).toArray()
        .then(data => {

            // console.log(data)
            res.status(200).json(data);

        });

}

