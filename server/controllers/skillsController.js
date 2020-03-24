
const skillsBusiness = require('../buisness/skillsBusiness');

class skillsController {
    static getSkills(req, res) {
        //console.log(req.body.user.result[0].company_id);
        skillsBusiness.getSkills(req.query)
            .then(data => { res.status(200).send(data) })
            .catch(err => res.status(404).send(err))
    }
}

module.exports = skillsController;