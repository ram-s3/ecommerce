const dbimport = require('../util/database');


exports.postNewContact = (req, res, next) => {

    const newContact = {
        name: req.body.name,
        phone: req.body.phoneno,
    }

    const db = dbimport.getDb();
    db.collection('contactlist').insertOne(newContact).then(resonse => res.status(201).json(resonse)).catch(err => console.log(err));

}