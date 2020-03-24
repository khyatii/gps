var UserBuisness = require('../buisness/userBuisness')
var LocationBuisness = require('../buisness/locationBuisness')
var RoleBuisness = require('../buisness/roleBuisness')
var GoalBuisness = require('../buisness/goalBuisness')

class UserController {
    static login(req, res, next) {
        UserBuisness.generateToken(req.body)
            .then((token) => {
                res.status(200).send(token)
            })
            .catch((err) => {
                res.status(404).send(err);
            })
    }

    static userSignup(req, res, next) {
        UserBuisness.userSignup(req.body)
            .then((token) => {
                res.status(200).send({ "token": token })
            })
            .catch((err) => {
                if (err == "Duplicate") {
                    res.status(400).send(err)
                    return;
                }
                res.status(404).send(err);
            })
    }

    static listCountry(req, res, next) {
        LocationBuisness.getCountry()
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(404).send(err)
            })
    }

    static listState(req, res) {
        LocationBuisness.getStateOrCities(req.params.id)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch(err => res.status(404).send(err))
    }

    static listCities(req, res) {
        LocationBuisness.getStateOrCities(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(data))
    }

    static getRoles(req, res) {
        RoleBuisness.getAllRoles(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }

    static getUsers(req, res) {
        UserBuisness.getAll(req.body.user)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }

    static deleteUser(req,res){
        UserBuisness.deleteUser(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }

    static getLoginUser(req, res) {
        UserBuisness.getLoginUser(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }

    static updateProfile(req, res) {
        UserBuisness.updateProfile(req.files, req.body.user)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getProfileImage(req, res) {
        UserBuisness.getProfileImage(req.body.user)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getSelectedUserProfileImage(req,res){
        UserBuisness.getSelectedUserProfileImage(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getUserData(req, res) {
        UserBuisness.getData(req.params.id)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getContactDetails(req,res){
        UserBuisness.getContactDetails(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getSelectedUserContactDetails(req,res){
        UserBuisness.getContactDetails(req.params)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getMultipleUserData(req, res) {
        UserBuisness.getMultipleUserData(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getCompanyUsers(req, res) {
        UserBuisness.getCompanyUsers(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getJobDetail(req, res) {
        UserBuisness.getJobDetailData(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static getSelectedUserJobDetail(req,res){
        UserBuisness.getJobDetailData(req.params)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static updateUserData(req, res) {
        UserBuisness.updateData(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static postContactDetail(req, res) {
        UserBuisness.updateContactData(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static postJobDetail(req, res) {
        UserBuisness.updateJobData(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }

    static getGoals(req, res) {
        GoalBuisness.getGoal(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static userInvitation(req, res) {
        UserBuisness.userInvitation(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static saveInvitedUser(req,res){
        UserBuisness.saveInvitedUser(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    
    static getInvitationLinkDetails(req,res){
        UserBuisness.getInvitationLinkDetails(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static forgotPassword(req, res) {
        UserBuisness.forgotPassword(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
            .catch(eror => res.status(503).send(eror))
    }
    static setPassword(req, res) {
        UserBuisness.setPassword(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
    static checkTokenExpire(req, res) {
        UserBuisness.checkTokenExpire(req.body)
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send(err))
    }
}

module.exports = UserController;