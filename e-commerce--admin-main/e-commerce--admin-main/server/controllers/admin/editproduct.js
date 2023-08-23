const mongoConnectimport = require("../../util/database");
const monogodb = require("mongodb");

exports.editproduct = (req, res, next) => {

    const db = mongoConnectimport.getDb();

    const id = req.params.id;

    const editedproduct = {

        name: req.body.name,
        color: req.body.color,
        price: req.body.price,
        category: req.body.category,
        inventory: req.body.inventory,
        description: req.body.description

    }

    if (req.file !== undefined) {
        editedproduct.images = req.file.path.replace("public\\", "/").replace("\\", '/');
    }

    db.collection('products').updateOne({ _id: new monogodb.ObjectId(id) }, { $set: editedproduct }).then(response => res.status(200).json(response));
}