const conn = require('../config/database');
const promise = require('promise');
const transporter = require('../config/mail');


class GoalBuisness {
    static insertGoal(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO goal ( goal_name, goal_description,expected_time,actual_time, user_id,company_id,date,currentTime) 
            VALUES 
                ( '${data.txtGoal}', '${data.txtGoalDescription}', '${data.expected_time}','-1','${data.user.result[0].id}',
                '${data.user.result[0].company_id}','${data.chosenDate}','${data.currentTime}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ goalid: result.insertId });
            })
        })
    }

    static getSingleGoal(data) {
        return new promise((resolve, reject) => {
            var sql = `SELECT expected_time,currentTime FROM goal WHERE id='${data.goalId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }
    static updatedAccuracy(data) {
        return new promise((resolve, reject) => {
            if (data.accuracy == undefined) {
                var sql = `SELECT expected_time,currentTime,accuracy FROM goal WHERE id='${data.goalId}';`
            } else {
                var sql = `UPDATE goal SET accuracy ='${data.accuracy}',isCompleted='${data.status}',actual_time='${data.actualTime}' WHERE id='${data.goalId}';`
            }
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                else {
                    var sql1 = `SELECT u.id,first_name,last_name,c.email from users u INNER JOIN company_profile c ON u.company_id=c.id WHERE u.id='${data.user.result[0].id}';`
                    conn.query(sql1, (err, result1) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        this.sendMail(data, result1, function (status) {
                            if (status) {
                                resolve(result1);
                            } else {
                                reject(err);
                            }
                        })
                    })
                }

            })
        })
    }

    static getGoal(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM goal WHERE (user_id ='${data.user.result[0].id}' && date ='${data.txtDate}')
            ||(user_id ='${data.user.result[0].id}' &&  isCompleted = 'false');`
            // let sql = `SELECT * from goal WHERE (user_id ='${data.user.result[0].id}'&& date ='${data.txtDate}' );`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }
    static sendMail(userdata, result1, callback) {
        var d = Number(userdata.actualTime);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var mailOptions = {
            from: '"GPS " <khyatis@qexon.com>',
            to: `${result1[0].email}`,
            subject: 'Goal Completed Status',
            html: `<div>
            ${userdata.user.result[0].first_name}'s goal is completed in Time: <b>${h} hours ${m} minutes</b>.
            </div>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return callback(false);
            } else {
                console.log('Message sent: ' + info.response);
                return callback(true);
            }
        });
    }

    static getMonthlyGoals(data) {
        return new promise((resolve, reject) => {
            let sql;
            if (data.data == '1') {
                sql = `SELECT * FROM goal WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 1 WEEK) AND NOW();`
            } else if (data.data == '2') {
                sql = `SELECT * FROM goal WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();`
            } else if (data.data == '3') {
                sql = `SELECT * FROM goal WHERE date BETWEEN DATE_SUB(NOW(), INTERVAL 1 YEAR) AND NOW();`
            } else if (data.data == '4') {
                sql = `SELECT * FROM goal WHERE (date BETWEEN '1970-1-1' AND '1970-1-2');`
            }
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }
    static getCustomGoals(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM goal WHERE (date BETWEEN '${data.fromDate}' AND '${data.toDate}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }


}
module.exports = GoalBuisness