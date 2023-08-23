const mongoConnectimport = require("../util/database");

exports.orderdetails = (req, res) => {
    const userid = req.params.userid;

    const db = mongoConnectimport.getDb()

    db.collection('orders').find({ user_id: userid.toString() }).toArray().then(orderdata => res.status(200).json(orderdata));
}