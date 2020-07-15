let jwt = require('jsonwebtoken');
const config = require('config');

let checkToken = (req, res, next) => {
    let token = req.get('Authorization').split(' ')[1];
    if (!token) return res.status(400).json({
        message: `Field access_token is missing`,
        location: "body"
    });

    jwt.verify(token, config.get('secretKey'), (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Access_token is not valid', err
            });
            next(err);
        }
        req.decoded = decoded;
    });

    next();
};

module.exports = {
    checkToken: checkToken
}
