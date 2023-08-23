const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/ecommerce'
    ).then(client => {
        console.log("connected to db");
        _db = client.db('ecommerce');
        callback();
    })
        .catch(err => {
            console.log(err);
            throw err;
        })
}


const getDb = () => {
    if (_db) {
        // console.log(_db.collection('beds').findOne());
        return _db;
    }
    throw 'No database found!';
};


// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

module.exports = {
    mongoConnect,
    getDb
}