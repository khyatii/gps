var OthersBusiness = require('../buisness/othersBusiness');
const way2sms = require('way2sms');
var conn = require('../config/database');

class OthersController {
    static saveMeetings(req, res) {
        OthersBusiness.saveMeetings(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewMeetings(req, res) {
        OthersBusiness.viewMeetings(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneMeeting(req, res) {
        OthersBusiness.getOneMeeting(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateMeetings(req, res) {
        OthersBusiness.updateMeetings(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteMeetings(req, res) {
        OthersBusiness.deleteMeetings(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateMeetingStatus(req, res) {
        OthersBusiness.updateMeetingStatus(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

    static emailBroadcast(req, res) {
        OthersBusiness.emailBroadcast(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getBroadcast(req, res) {
        OthersBusiness.getBroadcast(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneBroadcast(req, res) {
        OthersBusiness.getOneBroadcast(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static smsBroadcast(req, res) {
        let staffArray = req.body.staffId;

        var lol = way2sms.login('8860133909', 'khyati'); // reLogin

        lol.then(function (result) {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    let sql = `INSERT INTO broadcast (role_id,user_id,user_name,from_user_id,from_username,user_email,user_mobile,
                        type,description,company_id,created_on,updated_on) VALUES 
                        ('${req.body.roles}','${element.id}','${element.itemName}','${req.body.user.result[0].id}',
                        '${req.body.user.result[0].first_name} ${req.body.user.result[0].last_name}','${element.email}',
                        '${element.mobile}',
                        '${req.body.type}','${req.body.text}',
                        '${req.body.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result2) => {
                        if (err) {
                            return res.status(404).send(err);
                        } else {
                            way2sms.send(result, element.mobile, req.body.text);
                        }
                    });
                }
                if (index == staffArray.length - 1) {
                    let sql = `INSERT INTO broadcast (role_id,user_id,user_name,from_user_id,from_username,user_email,user_mobile,
                        type,description,company_id,created_on,updated_on) VALUES 
                        ('${req.body.roles}','${element.id}','${element.itemName}','${req.body.user.result[0].id}',
                        '${req.body.user.result[0].first_name} ${req.body.user.result[0].last_name}','${element.email}',
                        '${element.mobile}',
                        '${req.body.type}','${req.body.text}',
                        '${req.body.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result2) => {
                        if (err) {
                            return res.status(404).send(err);
                        } else {
                            way2sms.send(result, element.mobile, req.body.text);
                            res.status(200).send({ message: 'saved' });
                        }
                    });

                }
            });
        }, function (err) {
            res.status(404).send(err)
        });
    }
    static viewQuestionnaire(req, res) {
        OthersBusiness.viewQuestionnaire(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static postQuestion(req, res) {
        OthersBusiness.postQuestion(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteQuestionnaire(req, res) {
        OthersBusiness.deleteQuestionnaire(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneQuestion(req, res) {
        OthersBusiness.getOneQuestion(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateQuestion(req, res) {
        OthersBusiness.updateQuestion(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateLikes(req, res) {
        OthersBusiness.updateLikes(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateDisLikes(req, res) {
        OthersBusiness.updateDisLikes(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewLikesStatus(req, res) {
        OthersBusiness.viewLikesStatus(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static postComments(req, res) {
        OthersBusiness.postComments(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewComments(req, res) {
        OthersBusiness.viewComments(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewOneQuestionnaire(req, res) {
        OthersBusiness.viewOneQuestionnaire(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static likesCount(req, res) {
        OthersBusiness.likesCount(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static countComments(req, res) {
        OthersBusiness.countComments(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static countLikesStatus(req, res) {
        OthersBusiness.countLikesStatus(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

}

module.exports = OthersController;