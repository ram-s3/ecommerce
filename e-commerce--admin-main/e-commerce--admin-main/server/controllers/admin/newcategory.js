const { json } = require('body-parser');
const mongoConnectimport = require('../../util/database');

exports.addnewcategory = (req, res, next) => {
    const category = req.body;
    db = mongoConnectimport.getDb()

    db.collection('product_categories').insertOne(category).then(response => res.json(response))
}
