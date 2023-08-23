const mongoConnectimport = require('../util/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.postNewUser = async (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;
    const hashpassword = await bcrypt.hash(password, 12);
    // console.log(hashpassword);

    // console.log(name, email, password, phoneno);

    const db = mongoConnectimport.getDb();

    db.collection('users').findOne({ email: email }).then(resonse => {
        if (resonse !== null) {
            res.status(401).json({ msg: 'email already exist, can\'t signup!!!' });
        }
        else {
            db.collection('users').insertOne({ email: email, password: hashpassword }).then(resonse => {

                const token = jwt.sign({ email: resonse.email, id: resonse.insertedId }, 'passwordkeyisthissecrete', { expiresIn: '1h' });
                res.status(201).json({
                    msg: 'succfully created user',
                    // resonse,  for testing soon delted
                    token,
                    userid: resonse.insertedId
                })
            }
            )

        }
    }
    )

}