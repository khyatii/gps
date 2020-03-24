var conn = require('../config/database');
const promise = require('promise');
const transporter = require('../config/mail');

class OthersBuisness {

    static saveMeetings(data) {
        let dates = new Date(data.dated);
        let staffArray = data.staffId;
        let idArray = [];
        let nameArray = [];
        return new promise((resolve, reject) => {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
                if (index == staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
            });
            let sql = `INSERT INTO meetings (title,host,host_id,role_id,company_id,
                    user_id,user_name,date_time,duration,type,note,status,created_on,updated_on) VALUES 
                    ('${data.title}','${data.host}','${data.hostId}','${data.roles}','${data.user.result[0].company_id}',
                    '${idArray}','${nameArray}',
                    '${dates}','${data.duration}','${data.type}','${data.note}','pending','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "saved" });
            });

        })
    }
    static viewMeetings(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from meetings where host_id='${data.user.result[0].id}' AND company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static getOneMeeting(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from meetings where id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static updateMeetings(data) {
        let dates = new Date(data.dated);
        let staffArray = data.staffId;
        let idArray = [];
        let nameArray = [];
        return new promise((resolve, reject) => {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
                if (index == staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
            });
            let sql = `UPDATE meetings SET title='${data.title}',host='${data.host}',host_id='${data.hostId}',
            role_id='${data.roles}',company_id='${data.user.result[0].company_id}',
                user_id='${idArray}',user_name='${nameArray}',date_time='${dates}',
                duration= '${data.duration}',type='${data.type}',note='${data.note}',
                updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ message: "updated" });
            });

        })
    }
    static deleteMeetings(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM meetings WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateMeetingStatus(data) {
        let dates = new Date(data.dated);
        let staffArray = data.staffId;
        let idArray = [];
        let nameArray = [];
        return new promise((resolve, reject) => {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
                if (index == staffArray.length - 1) {
                    idArray.push(element.id);
                    nameArray.push(element.itemName);
                }
            });
            let sql = `UPDATE meetings SET title='${data.title}',host='${data.host}',host_id='${data.hostId}',
            role_id='${data.roles}',company_id='${data.user.result[0].company_id}',
                user_id='${idArray}',user_name='${nameArray}',date_time='${dates}',
                duration= '${data.duration}',type='${data.type}',note='${data.note}',
                status='${data.status}',updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ message: "updated" });
            });

        })
    }

    static emailBroadcast(data) {
        let staffArray = data.staffId;
        return new promise((resolve, reject) => {
            var sql1 = `SELECT c.email from users u INNER JOIN company_profile c ON u.company_id=c.id WHERE u.id='${data.user.result[0].id}';`
            conn.query(sql1, (err, result1) => {
                if (err) {
                    reject(err);
                    return;
                }
                else {
                    staffArray.forEach(function (element, index) {
                        if (index != staffArray.length - 1) {
                            let sql = `INSERT INTO broadcast (role_id,user_id,user_name,from_user_id,from_username,user_email,user_mobile,company_email,
                                type,subject,description,company_id,created_on,updated_on) VALUES 
                                ('${data.roles}','${element.id}','${element.itemName}','${data.user.result[0].id}',
                                '${data.user.result[0].first_name} ${data.user.result[0].last_name}','${element.email}',
                                '${element.mobile}','${result1[0].email}',
                                '${data.type}','${data.subject}','${data.description}',
                                '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                            conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve({ "message": "saved" });
                            });
                        }
                        if (index == staffArray.length - 1) {
                            let sql = `INSERT INTO broadcast (role_id,user_id,user_name,from_user_id,from_username,user_email,user_mobile,company_email,
                                type,subject,description,company_id,created_on,updated_on) VALUES 
                                ('${data.roles}','${element.id}','${element.itemName}','${data.user.result[0].id}',
                                '${data.user.result[0].first_name} ${data.user.result[0].last_name}','${element.email}',
                                '${element.mobile}','${result1[0].email}',
                                '${data.type}','${data.subject}','${data.description}',
                                '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                            conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                else {
                                    var mailArray = staffArray.map(function (item) {
                                        return item.email;
                                    });
                                    var mailOptions = {
                                        from: `"GPS " <${result1[0].email}>`,
                                        to: mailArray,
                                        subject: data.subject,
                                        html: `<div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
                                                <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
                                                <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                                                    <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                                                      <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                                                      <div>            
                                                        <p style="line-height: 1.2">
                                                        ${data.description}
                                                        </p><br>
                                                         </div>
                                                         <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                                                         <center style="margin-top:2em; line-height: 1.2;font-size:13px">
                                                         <p style="margin:0"><span style="display:inline-flex;padding-right:140px;"><a style="text-decoration: none;color: #727c8f" href="#">Contact</a></span>
                                                         <span><a style="text-decoration: none;color: #727c8f" href="#">Privacy Policy</a></span></p>
                                                           <p>Copyright &copy; GPS</p>
                                                           <p>This message was sent by GPS</p>
                                                         </center>
                                                       </div>
                                                      <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                                                    </div>
                                                   </div>`
                                    };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve({ "message": "saved" });
                                        }
                                    });

                                }
                            });
                        }
                    });
                }
            });

        });
    }

    static getBroadcast(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from broadcast where company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static getOneBroadcast(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from broadcast where id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }

    static postQuestion(data) {
        let dates = new Date();
        let a = data.question;
        let b = a.replace(/'/g, "\\'");
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO questionnaire (question,question_userid,question_username,ques_userEmail,title,tags,company_id,question_date,user_image,created_on,updated_on) VALUES 
            ('${b}','${data.user.result[0].id}','${data.user.result[0].first_name} ${data.user.result[0].last_name}',
            '${data.user.result[0].email}','${data.title}','${data.tags}','${data.user.result[0].company_id}','${dates}','${data.user.result[0].image}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "saved" });
            });
        })
    }
    static viewQuestionnaire(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from questionnaire where company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static deleteQuestionnaire(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE q1,q2 FROM questionnaire_comments q1 INNER JOIN 
            questionnaire_likes q2 ON q2.question_id = q1.questionnaire_id 
            WHERE q1.questionnaire_id = '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    let sql1 = `DELETE FROM questionnaire WHERE id= '${data.id}';`
                    conn.query(sql1, (err, result1) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result1);
                    })
                }
            });
        });
    }
    static getOneQuestion(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * from questionnaire where id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static updateQuestion(data) {
        let a = data.question;
        let b = a.replace(/'/g, "\\'");
        return new promise((resolve, reject) => {
            let sql = `UPDATE questionnaire SET question='${b}',title='${data.title}',tags='${data.tags}',
                updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ message: "updated" });
            });
        })
    }
    static updateLikes(data) {
        return new promise((resolve, reject) => {
            let sql1 = `SELECT id FROM questionnaire_likes WHERE user_id = ${data.user.result[0].id} AND 
            question_id=${data.data.id};`
            conn.query(sql1, (err, result1) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result1.length == 0) {
                    let sql = `INSERT INTO questionnaire_likes(question_id,user_id,likes_status,like_counts,company_id,created_on,updated_on) VALUES 
                    ('${data.data.id}','${data.user.result[0].id}','${data.likes_status}','${data.count}',
                    '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ message: "saved" });
                    });
                }
                else {
                    let sql = `UPDATE questionnaire_likes SET likes_status='${data.likes_status}',like_counts='${data.count}',
                    updated_on='${Date.now()}' WHERE id='${result1[0].id}';`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ message: "updated" });
                    });
                }
            });
        });
    }
    static updateDisLikes(data) {
        return new promise((resolve, reject) => {
            let sql1 = `SELECT id FROM questionnaire_likes WHERE user_id = ${data.user.result[0].id} AND 
            question_id=${data.data.id};`
            conn.query(sql1, (err, result1) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result1.length == 0) {
                    let sql = `INSERT INTO questionnaire_likes(question_id,user_id,dislikes_status,dislike_counts,company_id,created_on,updated_on) VALUES 
                    ('${data.data.id}','${data.user.result[0].id}','${data.dislikes_status}','${data.count}',
                    '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ message: "saved" });
                    });
                }
                else {
                    let sql = `UPDATE questionnaire_likes SET dislikes_status='${data.dislikes_status}',dislike_counts='${data.count}',
                                updated_on='${Date.now()}' WHERE id='${result1[0].id}';`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ message: "updated" });
                    });
                }
            });
        });
    }
    static viewLikesStatus(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * FROM questionnaire_likes WHERE user_id='${data.user.result[0].id}' AND
            question_id='${data.id}' AND company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static likesCount(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  like_counts,dislike_counts FROM questionnaire_likes WHERE question_id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static postComments(data) {
        let dates = new Date();
        let a = data.comments;
        let b = a.replace(/'/g, "\\'");
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO questionnaire_comments (questionnaire_id,comments,comment_userid,comment_username,company_id,user_image,comment_date,created_on,updated_on) VALUES 
            ('${data.id}','${b}','${data.user.result[0].id}','${data.user.result[0].first_name} ${data.user.result[0].last_name}',
            '${data.user.result[0].company_id}','${data.user.result[0].image}','${dates}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    let sql1 = `SELECT ques_userEmail,question_username FROM questionnaire WHERE id='${data.id}';`
                    conn.query(sql1, (err, result1) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                        this.sendMail(result1[0], data);
                    })
                }
            });
        })
    }
    static sendMail(result1, data) {
        var mailOptions = {
            from: '"GPS " <khyatis@qexon.com>',
            to: `${result1.ques_userEmail}`,
            subject: 'Questionnaire Comments',
            html: `<div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
            <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
               <div class="col-lg-2 col-sm-1 col-xs-1"></div>
               <div class="col-lg-8 col-sm-10 col-xs-10">
                 <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                 <div>
                   <p>Hello <b>${result1.question_username}</b>,</p>
                   <p style="line-height: 1.2"><b>${data.user.result[0].first_name} ${data.user.result[0].last_name}</b> has commented on your Question.<br></p>
                   <b>Comment:</b><div style="height: 123px;width: 80%;overflow: hidden;margin: 0 auto;">${data.comments}</div><br>
                   <p style="line-height: 1.2">Kindly check your account.</p><br>
                 </div>
                <p>Thanks,</p>
                <p>The GPS Team</p>
                 <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                 <center style="margin-top:2em; line-height: 1.2;font-size:13px">
                 <p style="margin:0"><span style="display:inline-flex;padding-right:140px;"><a style="text-decoration: none;color: #727c8f" href=${process.env.CLIENT_URL}>Contact</a></span>
                 <span><a style="text-decoration: none;color: #727c8f" href=${process.env.CLIENT_URL}>Privacy Policy</a></span></p>
                   <p>Copyright &copy; GPS 2018</p>
                   <p>This message was sent by GPS</p>
                   <a href=${process.env.CLIENT_URL}><img src="cid:abcdse@gm.com" style="width: 50px;"></a>
                 </center>
               </div>
              <div class="col-lg-2 col-sm-1 col-xs-1"></div>
              </div>
             </div>`
        };
        return new promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve('sent');
                }
            });
        });
    }
    static viewComments(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * FROM questionnaire_comments where company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static viewOneQuestionnaire(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT  * FROM questionnaire where id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static countComments() {
        return new promise((resolve, reject) => {
            let sql = `SELECT q1.id,count(q2.questionnaire_id) as count FROM questionnaire q1 
            LEFT JOIN questionnaire_comments q2 ON q1.id=q2.questionnaire_id GROUP BY q1.id;`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    static countLikesStatus() {
        return new promise((resolve, reject) => {
            let sql = `SELECT q1.id,count(q2.question_id) as count FROM questionnaire q1 
            LEFT JOIN questionnaire_likes q2 ON q1.id=q2.question_id GROUP BY q1.id;`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }

}
module.exports = OthersBuisness;