const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.get("Authorization");
    if (!authHeader) {
        console.log('no auth header found');
    }

    const token = authHeader.split(' ')[1];
    let decodedtoken;
    try {
        decodedtoken = jwt.verify(token, 'passwordkeyisthissecrete');
        req.userid = decodedtoken.id;
    } catch (err) {
        console.log(err);
    }

    if (!decodedtoken) {
        console.log('not authorized');
    }

    next();
}