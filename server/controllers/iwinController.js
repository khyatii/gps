
const iwinBusiness = require('../buisness/iwinBuisness');

class iwinController {
    static inputIwin(req, res) {
        iwinBusiness.saveIwin(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static showIwinData(req, res) {
        iwinBusiness.showIwinRecords(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static getOneIwin(req, res) {
        iwinBusiness.getOneIwin(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static updateIwin(req, res) {
        iwinBusiness.updateIwin(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static deleteIwin(req, res) {
        iwinBusiness.deleteIwin(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static getIwinRequests(req, res) {
        iwinBusiness.getIwinRequests(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static updateIwinStatus(req, res) {
        iwinBusiness.updateIwinStatus(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
}

module.exports = iwinController;