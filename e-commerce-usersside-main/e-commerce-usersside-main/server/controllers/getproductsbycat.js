const mongoConnectimport = require('../util/database');

exports.getProducts = (req, res, next) => {

    let category = req.params.category;
    const capcategory = category[0].toUpperCase() + category.slice(1);
    // console.log(capcategory)
    const db = mongoConnectimport.getDb();
    db.collection('products').find({ category: capcategory.toString() }).project({ name: 1, price: 1, images: 1, description: 1 }).toArray()
        .then(data => {

            // console.log(data)
            res.status(200).json(data);

        });

}

