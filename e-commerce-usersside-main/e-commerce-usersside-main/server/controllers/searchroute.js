const mongoConnectimport = require("../util/database");

exports.searchproduct = (req, res, next) => {
    const searchquery = req.params.searchquery;

    const db = mongoConnectimport.getDb()
    db.collection("products").find({ name: { $regex: `.*${searchquery.toString()}.`, $options: "i" } }).toArray().then(searchresults => {
        // console.log(searchresults);
        res.status(200).json(searchresults)
    })
}