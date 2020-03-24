var CompanyBuisness = require('../buisness/companyBuisness');
var promise = require('promise');
var async = require('async');
class CompanyController {

    static companySignup(req, res, next) {
        CompanyBuisness.signup(req.body)
            .then(data => {
                res.status(200).send(data)
            })
            .catch((err) => {
                if (err.errno == 1062) {
                    res.status(405).send(err);
                    return;
                }
                res.status(404).send(err);
            })
    }
}

module.exports = CompanyController;