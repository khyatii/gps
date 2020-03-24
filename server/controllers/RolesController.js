
const roleBusiness = require('../buisness/roleBuisness');

class roleController {
    static save(req, res) {
        roleBusiness.save(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
    static getAllRoles(req, res) {
        roleBusiness.getAllRoles(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }

    static update(req,res){
        roleBusiness.update(req.body)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }

    static getRoleInfo(req,res){
        roleBusiness.getRoleInfo(req)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
}

module.exports = roleController;