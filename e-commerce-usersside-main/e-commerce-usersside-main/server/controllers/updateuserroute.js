const mongoConnectimport = require("../util/database");
const mongodb = require("mongodb");
exports.updateuser = (req, res) => {
    const user = req.body;
    console.log(user);

    const db = mongoConnectimport.getDb()

    db.collection('users').updateOne({ _id: new mongodb.ObjectId(user.userid) }, { $set: user }).then(response => res.status(200).json(response));

}