const GoalBuisness = require('../buisness/goalBuisness');
const RoleBuisness = require('../buisness/roleBuisness');

class GoalController {
    static inputGoal(req, res) {
        GoalBuisness.insertGoal(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneGoal(req, res) {
        GoalBuisness.getSingleGoal(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateAccuracy(req, res) {
        GoalBuisness.updatedAccuracy(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getMonthlyGoals(req, res) {
        GoalBuisness.getMonthlyGoals(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getCustomGoals(req, res) {
        GoalBuisness.getCustomGoals(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getUserRoles(req, res) {
        RoleBuisness.getUserRoles(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
}

module.exports = GoalController