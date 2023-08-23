const dbimport = require('../../util/database');
const jwt = require("jsonwebtoken");



exports.adminlogin = (req, res, next) => {

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    if (email === '' || !email.includes('@')) {
        res.status(401).json({ errmsg: 'invalid email' })

    }

    if (password === '') {
        res.status(401).json({ errmsg: 'invalid password' })
    }

    const db = dbimport.getDb();

    db.collection('admin').findOne({ email: email }).then(result => {
        if (result !== null) {
            if (result.password === password) {
                const token = jwt.sign({ email: result.email, id: result._id.toString() }, 'passwordkeyisthissecrete', { expiresIn: '1h' });
                res.status(200).json({ message: 'admin login successfully', token })
            }
            else {
                res.status(401).json({ message: 'incorrect password!' });
            }
        }

        else {
            res.status(401).json({ message: 'email or password is wrong please try again with valid info.' });
        }

    })
        .catch(err => console.log(err));
}
