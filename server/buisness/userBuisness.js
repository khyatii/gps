const conn = require('../config/database');
const jwt = require('jsonwebtoken');
const transporter = require('../config/mail');
const RoleBuisness = require('./roleBuisness')
const promise = require('promise');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const bcrypt = require('bcryptjs');
const PasswordMiddle = require('../auth/pwdAuth')
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AccessKeyId,
    secretAccessKey: process.env.SecretAccessKey,
    signatureVersion: 'v4'
});

class UserBuisness {
    static generateToken(userdata) {
        return new Promise((resolve, reject) => {

            let sql = `SELECT * FROM users WHERE email = '${userdata.txtEmail}'`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (result.length == 0) {
                    reject(new Error('undefinded'))
                    return;
                }
                let query = `SELECT role_id FROM user_role WHERE user_id = '${result[0].id}' `;
                conn.query(query, (err, data) => {
                    console.log("process.env.SECRET", process.env.SECRET)
                    let token = jwt.sign({ result }, "SHHH");
                    resolve({ token: token, role: data[0].role_id, name: result[0].first_name, id: result[0].id });
                })
            })
        })

    }

    static userSignup(userdata) {
        return new promise((resolve, reject) => {
            let roleId = userdata.txtRole;
            let companyEmail = userdata.compoanyEmail;
            this.userEmail(userdata).
                then(userdataWithRole => {
                    if (userdataWithRole.companyEmail != undefined) {
                        companyEmail = userdataWithRole.companyEmail;
                    }
                    else {
                        companyEmail = userdataWithRole.compoanyEmail;
                    }
                    let sql = `SELECT id FROM company_profile WHERE email = '${companyEmail}' `;
                    conn.query(sql, (err, data) => {
                        let sql = `INSERT INTO users (first_name, last_name, email, pwd, mobile, company_id, country, state,city,image,created_on,updated_on,
                            zip_code,address,gender,blood_group, user_type) 
                        VALUES ( '${userdataWithRole.txtFirstName}','${userdataWithRole.txtLastName}','${userdataWithRole.txtEmail}',
                        '${userdataWithRole.password}','${userdataWithRole.txtMobile}', '${data[0].id}', '${userdataWithRole.txtCountry}',
                        '${userdataWithRole.txtState}','${userdataWithRole.txtCity}','http://localhost:4000/uploads/default.png',UNIX_TIMESTAMP() ,UNIX_TIMESTAMP() ,
                        '${userdataWithRole.txtZipcode}','${userdataWithRole.txtAddress1} ${userdataWithRole.txtAddress2}',
                        '${userdataWithRole.gender}','${userdataWithRole.BloodGroup}' , '${userdataWithRole.user_type}')`
                        conn.query(sql, (err, result) => {
                            if (err) {
                                if (err.errno == 1062) {
                                    let error = new Error("Duplicate")
                                    reject(error);
                                    return;
                                }
                                reject(err);
                                return;
                            }
                            if (result.affectedRows == 1) {      
                                if (roleId != undefined) {
                                    userdataWithRole.txtRole = roleId;
                                }
                                RoleBuisness.insertRole(userdataWithRole).then(res2 => {
                                    resolve({
                                        msg: 'user created',
                                        data: result
                                    })
                                    this.sendMail(userdataWithRole);
                                }).catch(err => {
                                    reject({
                                        msg: 'error on saving role'
                                    })
                                })
                            }
                        })
                    })
                }).catch(err => {
                    reject(err);
                })

        })
    }

    static userEmail(data) {

        return new promise((resolve, reject) => {
            let compoanyEmail;
            if (data.token != undefined) {

                jwt.verify(data.token, "SHHH", (err, dataToken) => {
                    compoanyEmail = dataToken.result[0].email;
                    data.compoanyEmail = compoanyEmail;

                    resolve(data)
                })
            }

            else {

                data.compoanyEmail = data.txtEmail;
                data.txtRole = 1;
                resolve(data)
            }
        })
    }
    static sendMail(userdata) {
        var mailOptions = {
            from: '"GPS " <khyatis@qexon.com>',
            to: `${userdata.txtEmail}`,
            subject: 'Welcome to GPS',
            html: `<div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
            <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
            <div class="col-lg-2 col-sm-1 col-xs-1"></div>
              <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                <div>
                  <p>Hello ${userdata.txtCompanyName},</p>
                   <p>Thank you for registering at GPS.COM!<br>
                   Confirm your email (${userdata.txtEmail}) by clicking below:</p><br>
                   <center><a href= http://localhost:4200/confirmLogin?link=86787>
                   <button style="background-color: #0052CC;font-family: Montserrat;color: white;cursor: pointer;font-weight: 600;margin: 0 2% 0 0;height: auto;border-radius: 4px;border: none;font-size: 17.5px; padding: 7px 15px;">
                   Confirm my email</button></a></center>
                   <p style="margin-top: 1em;">We remain at your disposal.<br>Thank you,</p>
                   <p>The GPS Team</p>
                </div>
              <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
              <center style="margin-top:2em; line-height: 1.2;font-size:13px">
                  <p style="margin:0"><span style="display:inline-flex;padding-right:140px;"><a style="text-decoration: none;color: #727c8f" href="http://localhost:4200/contact">Contact</a></span>
                  <span><a style="text-decoration: none;color: #727c8f" href="http://localhost:4200/privacy">Privacy Policy</a></span></p>
                  <p>Copyright &copy; GPS 2018</p>
                  <p>This message was sent by GPS</p>
              </center>
            </div>
            <div class="col-lg-2 col-sm-1 col-xs-1"></div>
          </div>
        </div>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
    static getAll(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE company_id = '${data.result[0].company_id}'`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static deleteUser(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE users SET status = 'I' WHERE id = ${data.id}`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getLoginUser(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT first_name,last_name,id FROM users WHERE id='${data.user.result[0].id}' AND company_id = '${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static updateProfile(file, user) {
        return new promise((resolve, reject) => {
            let sampleFile = file.image;
            if (sampleFile) {
                UserBuisness.uploadFileToS3AndGetUrl(`profile/profile-${user.result[0].id}.jpg`, `gps-upload`, sampleFile).then(imageUrl => {
                    // Use the mv() method to place the file somewhere on your server
                    let sql = `UPDATE users SET image = '${imageUrl}' WHERE id = '${user.result[0].id}'`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err)
                            return;
                        }
                        resolve(result);
                    })
                }).catch(err => {
                })
            }
        })
    }

    static getProfileImage(user) {
        return new promise((resolve, reject) => {
            let sql = `SELECT image FROM users WHERE id = '${user.result[0].id}'`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getSelectedUserProfileImage(id) {
        return new promise((resolve, reject) => {
            let sql = `SELECT image FROM users WHERE id = '${id}'`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    //get contact details    
    static getContactDetails(data) {
        let selUserId;
        if (data.id != undefined) {
            selUserId = data.id;
        }
        else {
            selUserId = data.user.result[0].id;
        }
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id = '${selUserId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getSelectedUserContactDetails(id) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id = '${id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    //get personal details 
    static getData(id) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id = '${id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }
    static getMultipleUserData(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE id in (${data.ids});`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }
    //post personal details 
    static updateData(data) {
        let updateUserId = data.user.result[0].id;
        if (data.selUserId != undefined) {
            updateUserId = data.selUserId;
        }
        return new promise((resolve, reject) => {
            let sql = `UPDATE users SET first_name = '${data.firstName}',last_name = '${data.lastName}',
            gender = '${data.gender}',dob = '${data.dateofbirth}',blood_group = '${data.BloodGroup}'
            WHERE id ='${updateUserId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve({ 'message': 'updated' });
            })
        })
    }
    //post contact details 
    static updateContactData(data) {
        if (data.id == undefined) {
            data.id = data.user.result[0].id;
        }
        return new promise((resolve, reject) => {
            let sql = `UPDATE users SET address = '${data.address}',country = '${data.country}',
            state = '${data.state}',city = '${data.city}',zip_code = '${data.pin_code}',
            email = '${data.email}',mobile = '${data.mobile}'
            WHERE id ='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve({ message: 'updated' });
            })
        })
    }
    //get job details 
    static getJobDetailData(data) {
        let userId;
        if (data.id != undefined) {
            userId = data.id;
        }
        else {
            userId = data.user.result[0].id
        }
        return new promise((resolve, reject) => {
            let sql = `SELECT jd.*,u.id AS user_id,u.status AS user_status,r.name AS role_name,u.user_type FROM user_role AS ur 
            LEFT JOIN users AS u ON u.id = ur.user_id
            LEFT JOIN job_detail AS jd ON jd.user_id = u.id
            LEFT JOIN role AS r ON r.id = ur.role_id
            WHERE u.id = ${userId}`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }
    //post job details 
    static updateJobData(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM  job_detail WHERE user_id ='${data.staffId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                if (result.length == 0) {
                    var sql1 = `INSERT INTO job_detail (staff_id,user_id,company_id,department,designation,employment_status,joining_date,salary,skills) VALUES 
                    ('${data.staffId}','${data.staffId}','${data.user.result[0].company_id}','${data.Department}',
                    '${data.Designation}','${data.Status}','${data.joining_date}','${data.Salary}','${data.Skills}');`

                } else {
                    var sql1 = `UPDATE job_detail SET staff_id = '${data.staffId}',salary = '${data.Salary}',
                        department = '${data.Department}',designation = '${data.Designation}',
                        employment_status = '${data.Status}',joining_date = '${data.joining_date}', skills = '${data.Skills}' 
                        WHERE user_id ='${data.staffId}';`
                }
                conn.query(sql1, (err, result1) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    resolve({ message: 'updated' });
                })
            })
        })
    }

    //get company user details 
    static getCompanyUsers(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT u.*,r.name AS role_name FROM user_role AS ur 
            LEFT JOIN users AS u ON u.id = ur.user_id
            LEFT JOIN role AS r ON r.id = ur.role_id
            WHERE u.company_id = ${data.user.result[0].company_id} AND u.email != '${data.user.result[0].email}' AND u.status='A';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getInvitationLinkDetails(data) {
        const decryptedString = cryptr.decrypt(data.link);
        let link = decryptedString;
        link = link.split('?');
        let txtEmail = link[0];
        let txtRole = link[1];
        let company_id = link[2];
        let invitationId = link[3];
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM invitation_links WHERE id = ${invitationId} AND active = 'A';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                if (result.length > 0)
                    resolve(result);

                else
                    reject({
                        err: 'link expired'
                    });
            })
        })
    }

    //save invited user
    static saveInvitedUser(data) {
        const decryptedString = cryptr.decrypt(data.link);
        let link = decryptedString;
        link = link.split('?');
        let txtEmail = link[0];
        let txtRole = link[1];
        let company_id = link[2];
        let invitationId = link[3];
        data.company_id = company_id;
        data.txtRole = txtRole;
        return new promise((resolve, reject) => {
            bcrypt.hash(data.password, 10, function (err, hash) {
                if (err) reject(err);
                data.password = hash;
                UserBuisness.getCompanyDetailsById(company_id).then(res => {
                    data.companyEmail = res[0].email;
                    UserBuisness.userSignup(data).then(res => {
                        UserBuisness.disableInvitationLink(invitationId).then(res => {
                            resolve(res);
                        }).catch(err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                })
            })
        })
    }

    static disableInvitationLink(id) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE invitation_links SET active = 'I' WHERE id = ${id}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getCompanyDetailsById(id) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM company_profile WHERE id = ${id}`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    //sendInvitation
    static userInvitation(data) {
        return new promise((resolve, reject) => {
            UserBuisness.checkIfUserExist(data).then(res1 => {
                if (res1.length > 0) {
                    reject('user already exist');
                }
                else {
                    UserBuisness.InsertInvitation(data).then(res => {     // INSERT INVITATION DATA
                        //.log(res['insertId'])
                        data.invitationId = res['insertId'];
                        const encryptedString = cryptr.encrypt(data.txtEmail + '?' + data.txtRole + '?' + data.user.result[0].company_id + '?' + data.invitationId);
                        data.encryptedString = encryptedString;
                        data.link = `${process.env.CLIENT_URL}signup?link=${data.encryptedString}`;

                        UserBuisness.sendInvitationMail(data, encryptedString).then(res1 => {        // SEND EMAIL
                            resolve({
                                msg: res1
                            });
                        }).catch(err => {
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                }
            })
        })
    }

    static checkIfUserExist(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = '${data.txtEmail}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static InsertInvitation(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO invitation_links ( invitation_name, sender_email, recipient_email , user_id, company_id)
                        VALUES ('User Invitation', '${data.txtEmail}','${data.user.result[0].email}' , ${data.user.result[0].id},
                            ${data.user.result[0].company_id});`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static sendInvitationMail(data, encryptedString) {
        var mailOptions = {
            from: '"GPS " <vishulg@qexon.com>',
            to: `${data.txtEmail}`,
            subject: 'Invitation Link',
            html: `
            <div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
            <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
               <div class="col-lg-2 col-sm-1 col-xs-1"></div>
               <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                 
                 <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                 <div>
                   <p>Hello <b><email>${data.txtEmail}</email></b>,</p>
                   <p style="line-height: 1.2">  You have been invited by <b>${data.user.result[0].first_name}</b> 
                   (<email>${data.user.result[0].email}</email>) to 
                   join on GPS.
                   If you don't want to join then please ignore this email. otherwise please join through this button : </p><br>
                   <center><a href= ${data.link}><button style="background-color: #0052CC;font-family: Montserrat;color: white;cursor: pointer;font-weight: 700;margin: 0 2% 0 0;height: auto;border-radius: 4px;border: none;font-size: 17.5px; padding: 7px 15px;">
                   Invitation Link</button></a></center>
                 </div>
                <p>Thanks,</p><br>
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
        })
    }

    //forgot Password
    static forgotPassword(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT id,company_id FROM users WHERE email = '${data.email}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                else {
                    if (result.length === 0) {
                        return reject(err);
                    } else {
                        UserBuisness.InsertForgotPassword(data, result).then(res => {     // INSERT INVITATION DATA
                            data.invitationId = res['insertId'];
                            const encryptedString = cryptr.encrypt(data.email + '?' + result[0].id + '?' + result[0].company_id + '?' + data.invitationId);
                            data.encryptedString = encryptedString;
                            data.link = `${process.env.CLIENT_URL}setPassword?link=${data.encryptedString}`;
                            UserBuisness.forgotPasswordMail(data).then(res => {
                                resolve(res);
                            }).catch(err => {
                                reject(err);
                            });
                        }).catch(err => {
                            reject(err);
                        })
                    }
                }
            });
        });
    }

    static checkTokenExpire(data) {
        const decryptedString = cryptr.decrypt(data.id);
        var x = decryptedString.split("?");
        return new promise((resolve, reject) => {
            let sql = `SELECT active FROM invitation_links WHERE id = '${x[3]}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static setPassword(data) {
        const decryptedString = cryptr.decrypt(data.link);
        var x = decryptedString.split("?");
        return new promise((resolve, reject) => {
            let password = data.password;
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    res.status(404).send(err);
                    return;
                } else {
                    let sql = `UPDATE users SET pwd = '${hash}' WHERE id = '${x[1]}';`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err)
                            return;
                        }
                        if (result.affectedRows == 1) {
                            let sql = `UPDATE invitation_links SET active = 'I' WHERE id = '${x[3]}';`
                            conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err)
                                    return;
                                }
                                resolve(result);
                            })
                        }
                    }).catch(err => {
                        reject(err);
                    })
                }
            });
        })
    }

    static InsertForgotPassword(data, result) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO invitation_links ( invitation_name, sender_email,recipient_email, user_id, company_id)
                        VALUES ('Forgot Password', '${data.email}','${data.email}', '${result[0].id}',
                            '${result[0].company_id}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        }).catch(err => {
            reject(err);
        })
    }
    static forgotPasswordMail(data) {
        var mailOptions = {
            from: '"GPS " <gps@qexon.com>',
            to: `${data.email}`,
            subject: 'Restore Password',
            html: `<div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
            <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
               <div class="col-lg-2 col-sm-1 col-xs-1"></div>
               <div class="col-lg-8 col-sm-10 col-xs-10">
                 <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                 <div>
                   <p>Hello <b><email>${data.email}</email></b>,</p>
                   <p style="line-height: 1.2">We have received a request to reset the password.<br><br>
					Your Password recreation request has been approved.<br>
					Kindly set your password by clicking on the button below:</p><br>
					<center><a href= ${data.link}><button style="background-color: #0052CC;font-family: Montserrat;color: white;cursor: pointer;font-weight: 700;margin: 0 2% 0 0;height: auto;border-radius: 4px;border: none;font-size: 17.5px; padding: 7px 15px;">
                    Restore Password</button></a></center>
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
                    resolve({ message: 'sent' });
                }
            });
        }).catch(err => {
            reject(err);
        })
    }

    // upload file to s3
    static uploadFileToS3AndGetUrl(fileName, bucket, binary) {
        return new Promise((resolve, reject) => {
            let buf = binary.data;
            const params = {
                Bucket: bucket,
                Key: fileName,
                Body: buf,
                ContentType: 'image/jpg',
                ACL: 'public-read'
            };
            let s3prom = s3.upload(params).promise();

            s3prom.then(data => {
                resolve(data.Location);
            }).catch(err => {
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    }

}

module.exports = UserBuisness