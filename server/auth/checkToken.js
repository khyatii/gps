var jwt = require('jsonwebtoken');
class CheckToken {
    static verify(req, res, next) {
        jwt.verify(req.headers.authorization, "SHHH", (err, result) => {
            req.body.user = result;
            next();
        })
    }
}

module.exports = CheckToken;