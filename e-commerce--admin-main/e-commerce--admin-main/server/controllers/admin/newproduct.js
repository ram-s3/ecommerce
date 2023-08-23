const mongoConnectimport = require('../../util/database');

exports.addnewproductpost = (req, res, next) => {
    console.log(req.file)

    const newproduct = {

        name: req.body.name,
        images: req.file.path.replace("public\\", "/").replace("\\", '/'),
        color: req.body.color,
        price: req.body.price,
        category: req.body.category,
        inventory: req.body.inventory,
        description: req.body.description

    }



    const db = mongoConnectimport.getDb();

    db.collection('products').insertOne(newproduct).then(response => res.status(200).json(response));


}
