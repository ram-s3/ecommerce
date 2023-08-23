const dbimport = require('../util/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.loginuser = (req, res, next) => {

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (email === '' || !email.includes('@')) {
        res.status(401).json({ errmsg: 'invalid email' })

    }

    if (password === '') {
        res.status(401).json({ errmsg: 'invalid password' })
    }

    const db = dbimport.getDb();

    db.collection('users').findOne({ email: email }).then(result => {
        if (result !== null) {

            bcrypt.compare(password, result.password).then(isvaliduser => {
                if (isvaliduser) {
                    const token = jwt.sign({ email: result.email, id: result._id.toString() }, 'passwordkeyisthissecrete', { expiresIn: '1h' });
                    res.status(200).json({ message: 'user login successfully', token, userid: result._id })
                }
                else {
                    res.status(401).json({ message: 'incorrect password!' });
                }
            })

        }
        else {
            res.status(401).json({ message: 'email or password is wrong please try again with valid info.' });
        }

    })
        .catch(err => console.log(err));
}