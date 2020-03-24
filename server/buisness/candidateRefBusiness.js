const conn = require('../config/database');
const promise = require('promise');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const transporter = require('../config/mail');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AccessKeyId,
    secretAccessKey: process.env.SecretAccessKey,
    signatureVersion: 'v4'
});

const dummyRefId = 22;

class CandidateRefBusiness {

    static uploadFileToS3AndGetUrl(fileName, bucket, file) {
        //console.log(binary)
        return new Promise((resolve, reject) => {
            let buf = file.data;
            const params = {
                Bucket: bucket,
                Key: fileName,
                Body: buf,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };
            //console.log(params)
            let s3prom = s3.upload(params).promise();

            s3prom.then(data => {
                //console.log(data);
                resolve(data.Location);
            }).catch(err => {
                //console.log(err);
                reject(err);
            })
        })
    }

    static postBasicInfo(data) {
        return new Promise((resolve, reject) => {

            let pId = data.p_id;
            const refId = data.refDetails;
            console.log('pid', data.p_id)
            let sql = `SELECT id FROM candidateRef_basicInfo WHERE parent_id =${pId};`
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log('error of qualification', err)
                    reject(err);
                }
                if (result.length < 1) {
                    let sql = `INSERT INTO candidateRef_basicInfo ( first_name, last_name, email, phone, dob,
                    parent_id, company_id, created_on,	updated_on) VALUES  ( '${data.firstName}', 
                    '${data.lastName}', '${data.email}','${data.phone}','${data.dob}',${pId},
                    ${refId.companyId},'${Date.now()}','${Date.now()}');`

                    conn.query(sql, (err, result) => {
                        if (err) {
                            console.log('error occured', err)
                            reject(err);
                        }

                        console.log('result after saving basic info', result);
                        resolve({
                            result: result,
                            parentId: pId
                        });
                    })

                } else {
                    let sql = `UPDATE candidateRef_basicInfo SET first_name = '${data.firstName}' , last_name = '${data.lastName}'
                    , email = '${data.email}', phone ='${data.phone}', dob = '${data.dob}',parent_id =${pId},
                    updated_on = '${Date.now()}'
                    WHERE parent_id=${data.p_id};`
                    conn.query(sql, (err, updateResult) => {
                        if (err) {
                            console.log('error occured inside update basic info', err);
                            reject(err);
                        }
                        console.log('result after updateResult', updateResult);
                        resolve(result);
                    })
                }
            })
        })
    }

    static postQualification(data) {
        return new Promise((resolve, reject) => {
            let parentId = data.p_id;
            const refId = data.refDetails;
            console.log('parent id', parentId);
            let sql = `SELECT id FROM candid_qualification WHERE parent_id =${parentId};`
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log('error of qualification', err)
                    reject(err);
                }
                if (result.length < 1) {
                    console.log('its inside new entry', result)
                    let sql = `INSERT INTO candid_qualification( ClassX_Board, ClassX_Percentage, ClassX_YrOfPassing,
                    ClassXII_Board, ClassXII_Percentage, ClassXII_YrOfPassing,	Graduation_Board, 
                    Graduation_Percentage, Graduation_YrOfPassing, Masters_Board, Masters_Percentage, Masters_YrOfPassing,
                    company_id, updated_on,	parent_id)
                    VALUES  ( '${data.ClassX_Board}', '${data.ClassX_Percentage}', '${data.ClassX_YrOfPassing}', 
                    '${data.ClassXII_Board}', '${data.ClassXII_Percentage}','${data.ClassXII_YrOfPassing}',
                    '${data.Graduation_Board}','${data.Graduation_Percentage}','${data.Graduation_YrOfPassing}',
                    '${data.Masters_Board}','${data.Masters_Percentage}','${data.Masters_YrOfPassing}',
                     ${refId.companyId},'${Date.now()}',${data.p_id});`

                    conn.query(sql, (err, result) => {
                        if (err) {
                            console.log('error of qualification', err)
                            reject(err);
                        }
                        else {
                            console.log('result after insert', result);
                            // resolve(result)
                        }
                    })
                } else {
                    console.log('its inside update entry', result)
                    let sql = `UPDATE candid_qualification SET ClassX_Board = '${data.ClassX_Board}', ClassX_Percentage = '${data.ClassX_Percentage}',
                    ClassX_YrOfPassing = '${data.ClassX_YrOfPassing}', ClassXII_Board = '${data.ClassXII_Board}',ClassXII_Percentage = '${data.ClassXII_Percentage}',
                    ClassXII_YrOfPassing = '${data.ClassXII_YrOfPassing}', Graduation_Board =  '${data.Graduation_Board}', Graduation_Percentage = '${data.Graduation_Percentage}',
                    Graduation_YrOfPassing = '${data.Graduation_YrOfPassing}',Masters_Board ='${data.Masters_Board}',Masters_Percentage = '${data.Masters_Percentage}',
                    Masters_YrOfPassing = '${data.Masters_YrOfPassing}',created_on = '${Date.now()}' , updated_on = '${Date.now()}' 
                    WHERE parent_id=${data.p_id};`

                    conn.query(sql, (err, result) => {
                        if (err) {
                            console.log('error of qualification', err)
                            reject(err);
                        }
                        else {
                            console.log('result after update', result)
                            resolve(result)
                        }
                    })
                }
            })
        })
    }

    static PostSkills(data) {
        return new Promise((resolve, reject) => {
            console.log('data recieved inside skills ', data);
            const refId = data.refDetails;
            let sql = `SELECT id FROM candid_skills WHERE parent_id =${data.parentId};`
            conn.query(sql, (err, result) => {
                if (err) {
                    console.log('error in saving skillls', err)
                    // reject(err);
                }
                else {
                    console.log('parent id in skills found ', result);
                    if (result.length < 1) {
                        let userSkill = data.allskills.toString()
                        let sql = `INSERT INTO candid_skills( skills, company_id, created_on, updated_on, parent_id)
                        VALUES  ('${userSkill}',${refId.companyId},'${Date.now()}','${Date.now()}',${data.parentId});`
                        conn.query(sql, (err, result) => {
                            if (err) {
                                console.log('error in saving skillls', err)
                                reject(err);
                            }
                            else {
                                console.log('result of insert skills ', result);
                                resolve(result);
                            }
                        })
                    }
                    else {
                        let userSkill = data.allskills.toString()
                        let updateSql = `UPDATE candid_skills SET skills ='${userSkill}',
                        updated_on =  '${Date.now()}' WHERE parent_id =${data.parentId}`
                        conn.query(updateSql, (err, result) => {
                            console.log('error in saving skillls')
                            if (err) {
                                console.log('error in updating skillls', err);
                                // reject(err);
                            }
                            else {
                                console.log('result of upadte skills ', result);
                                resolve(result);
                            }
                        })
                    }
                }
            })
        })
    }

    static postWorkExperience(data) {
        return new Promise((resolve, reject) => {
            const refId = data.refDetails;
            console.log('data of experience', data);
            if (data.exp !== null) {
                let sql = `SELECT id FROM candid_exp WHERE parent_id =${data.p_id};`
                conn.query(sql, (err, result) => {
                    if (err) {
                        console.log('error infinding parent id', err);
                        reject(err);
                    } else {
                        console.log('found parent id result ', result);
                        var c_id = 2;
                        var count = 0;
                        var length = data.exp.itemRows.length;
                        if (result.length < 1) {  //insert new row

                            CandidateRefBusiness.addExpData(data, refId)
                                .then(savedResult => {
                                    resolve(savedResult)
                                })
                                .catch(err => {
                                    reject(err);
                                })
                        } else {  //update the row with found id
                            if (result.length !== data.exp.itemRows.length) {
                                console.log('inside right block')
                                let sql = `DELETE FROM candid_exp WHERE id IN (`
                                result.forEach((obj, i) => {
                                    sql += obj.id;
                                    if (i == result.length - 1) sql += `)`;
                                    else sql += `,`;
                                })

                                conn.query(sql, function (err, resp) {
                                    if (err) {
                                        console.log('error in deleting', err);
                                    } else {
                                        console.log('response after deleting', resp);
                                        CandidateRefBusiness.addExpData(data, refId)
                                            .then(savedResult => {
                                                resolve(savedResult);
                                            })
                                            .catch(err => {
                                                reject(err);
                                            })
                                    }
                                })
                            } else {
                                let countUpdateRows = 0;
                                data.exp.itemRows.forEach((obj, i) => {
                                    sql = `UPDATE candid_exp SET company_name = '${obj.companyName}', from_date= '${obj.fromDate}',
                                to_date = '${obj.toDate}',location = '${obj.location}',designation ='${obj.designation}',
                                updated_on = UNIX_TIMESTAMP(), parent_id = ${data.p_id}, WHERE id =${result[i].id} ;`

                                    conn.query(sql, function (err, resp) {
                                        if (err) {
                                            console.log('error occured', err);
                                        } else {
                                            countUpdateRows++;
                                            if (countUpdateRows == data.exp.itemRows.length) {
                                                resolve(resp);
                                            }
                                        }
                                    })
                                })
                            }
                        }
                    }
                })
            } else {
                if (data.p_id !== null || data.p_id !== undefined) {
                    let findIdsql = `SELECT id FROM candid_exp WHERE parent_id =${data.p_id};`
                    conn.query(findIdsql, function (err, resp) {
                        if (resp.length < 1) {
                            resolve({ msg: 'data not saved no experience' })
                        } else {
                            let deleteSql = `DELETE FROM candid_exp WHERE id IN (`
                            resp.forEach((obj, i) => {
                                deleteSql += obj.id;
                                if (i == resp.length - 1) deleteSql += `)`;
                                else deleteSql += `,`;
                            })
                            conn.query(deleteSql, function (err, resp) {
                                if (err) reject(err);
                                else resolve(resp);
                            })
                        }
                        if (err) reject(err)

                    })
                } else {
                    resolve({ msg: 'data not saved no experience' })
                }
            }
        })
    }

    static addExpData(data, refId) {
        return new Promise((resolve, reject) => {
            var c_id = 2;
            var count = 0;
            var length = data.exp.itemRows.length;
            let sql = `INSERT INTO candid_exp( company_name, from_date, to_date,
            location, designation,created_on,updated_on, parent_id, company_id) VALUES `

            data.exp.itemRows.forEach(obj => {
                count++;
                sql += `('${obj.companyName}', '${obj.fromDate}', '${obj.toDate}', '${obj.location}', 
                '${obj.designation}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),${data.p_id},${refId.companyId})`
                if (count == length) sql += `;`;
                else sql += `,`;
            });

            conn.query(sql, function (err, resp) {
                if (err) console.log(err);
                resolve(resp);
            })
        })
    }

    static PostSocial(file, data) {
        return new Promise((resolve, reject) => {
            const cv = file.resume;
            const socialData = data;
            let someId = 'abcsdfsdf345d'
            let contentType = cv.mimetype;
            let ind = contentType.indexOf('/') + 1;
            let type = contentType.substring(ind, contentType.length)
            const refId = data.refDetails;
            console.log('refId', refId)
            CandidateRefBusiness.uploadFileToS3AndGetUrl(`resume/resume-${refId.invitaionId}.${type}`, 'gps-upload', cv)
                .then(fileUrl => {
                    //console.log('generated url',fileUrl);
                    let findpid = `SELECT id FROM candid_ref WHERE invitaion_id	 = ${refId.invitaionId}`
                    conn.query(findpid, (err, parentID) => {
                        if (err) reject(err)
                        else {
                            console.log('parentid ', parentID);
                            let sql = `INSERT INTO candid_social( github, linkedin, facebook, twitter, parent_id, 
                        created_on,updated_on,resume,company_id) VALUES  
                        ('${socialData.github}','${socialData.linkedin}', '${socialData.facebook}',
                        '${socialData.twitter}',${parentID[0].id},UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),'${fileUrl}',${refId.companyId});`

                            // console.log('generated Sql is',sql);
                            conn.query(sql, function (err, resp) {
                                if (err) {
                                    reject(err)
                                    //console.log(' err response id',err)
                                }
                                else {
                                    let sql = `UPDATE candid_ref SET submit_status = 1`;
                                    conn.query(sql, function (err, result) {
                                        if (err) reject(err)
                                        else resolve({ status: 1 })
                                    })
                                }
                            })
                        }
                    })

                })
                .catch(err => {
                    reject(err)
                    // console.log('error occured',err);
                })
        })
    }

    static candidateInvitation(data) {
        //console.log(data)
        return new promise((resolve, reject) => {
            console.log('ads')
            CandidateRefBusiness.checkIfCandidateExist(data).then(res1 => {
                if (res1.length > 0) {
                    reject({
                        msg: 'user already exist'
                    });
                }
                else {
                    CandidateRefBusiness.InsertInvitation(data).then(res => {     // INSERT INVITATION DATA
                        data.invitationId = res['insertId'];
                        let userId = data.user.result[0].id;
                        let userCompanyId = data.user.result[0].company_id;
                        let candidateEmail = data.txtEmail;
                        let jobId = data.jobId;
                        const encryptedString = cryptr.encrypt(candidateEmail + '?' + userId + '?' + jobId + '?' + userCompanyId + '?' + data.invitationId);
                        data.encryptedString = encryptedString;
                        data.link = `${process.env.CLIENT_URL}candidate-reference?link=${data.encryptedString}`;

                        CandidateRefBusiness.sendInvitationMail(data, encryptedString).then(res1 => {        // SEND EMAIL
                            resolve(res1);
                        }).catch(err => {
                            console.log(err)
                            reject(err);
                        })
                    }).catch(err => {
                        reject(err);
                    })
                }
            }).catch(err => {
                reject(err);
            })

        })
    }

    static checkIfCandidateExist(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE email = '${data.txtEmail}';`
            //console.log(sql)
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
            console.log('insdie insert invitation', data)
            CandidateRefBusiness.deletePreviousInvitationLink(data).then(res1 => {
                let sql = `INSERT INTO invitation_links ( invitation_name, job_id, sender_email, recipient_email , user_id, company_id)
                        VALUES ('User Invitation',${data.jobId},'${data.user.result[0].email}', '${data.txtEmail}' , ${data.user.result[0].id},
                            ${data.user.result[0].company_id});`
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
        })
    }

    static deletePreviousInvitationLink(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM invitation_links WHERE recipient_email = '${data.txtEmail}' AND user_id = ${data.user.result[0].id}
             AND company_id = ${data.user.result[0].company_id};`
            console.log(sql)
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
                    resolve({ msg: 'sent' });
                }
            });
        })
    }


    static decryptUserLink(data) {
        return new Promise((resolve, reject) => {
            console.log('data is', data.refDetails)
            let dataObj = data.refDetails;
            let sql = `SELECT  id,submit_status FROM candid_ref WHERE invitaion_id =${dataObj.invitaionId}`
            conn.query(sql, (err, resp) => {
                if (err) {
                    reject(err)
                }
                console.log('result is', resp);
                if (resp.length < 1) {
                    let sql = `INSERT INTO candid_ref(company_id, job_id, user_email, invitaion_id,submit_status, created_on,
                    updated_on,user_id) VALUES  (${dataObj.companyId},${dataObj.jobId},'${dataObj.email}', ${dataObj.invitaionId},0 ,
                    '${Date.now()}','${Date.now()}',${dataObj.userId})`

                    conn.query(sql, (err, resp) => {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve({
                                pId: resp.insertId,
                                submitStatus: 0
                            });
                            console.log('response after saving into candid ref', resp);
                        }
                    })
                } else {
                    resolve({
                        pId: resp[0].id,
                        submit_status: resp[0].submit_status
                    });
                }
            })
        })
    }

    static getCompanyRef(data) {
        return new Promise((resolve, reject) => {
            let companyId = data.user.result[0]['company_id'];
            let sql = `SELECT crb.first_name,crb.last_name,cs.skills,crf.id, cso.resume FROM candid_ref AS crf 
           LEFT JOIN candidateRef_basicInfo AS crb ON crb.parent_id = crf.id 
           LEFT JOIN candid_skills AS cs ON cs.parent_id = crf.id
           LEFT JOIN candid_social AS cso ON cso.parent_id = crf.id WHERE crf.company_id = ${companyId} AND crf.submit_status = 1 
           AND interview_status IS NULL `

            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else {
                    resolve(resp)
                }
            })
        })
    }

    static declineRef(data) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE candid_ref SET interview_status='D' WHERE id = ${data.declineRef}`
            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else resolve(resp)
            })
        })
    }

    static holdRef(data) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE candid_ref SET interview_status='H' WHERE id = ${data.holdRef}`
            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else resolve(resp);
            })
        })
    }

    static getoneRefInfo(data) {
        return new Promise((resolve, reject) => {
            console.log('data is', data)
            let id = data.id;
            let sql = `SELECT crb.*,cs.*,crf.id, cso.*,cq.*,cexp.* FROM candid_ref AS crf 
            LEFT JOIN candidateRef_basicInfo AS crb ON crb.parent_id = crf.id 
            LEFT JOIN candid_skills AS cs ON cs.parent_id = crf.id
            LEFT JOIN candid_qualification AS cq ON cq.parent_id = crf.id
            LEFT JOIN candid_exp AS cexp ON cexp.parent_id = crf.id
            LEFT JOIN candid_social AS cso ON cso.parent_id = crf.id WHERE crf.id = ${id} 
            AND crf.submit_status = 1`

            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else {
                    let worksql = `SELECT * FROM candid_exp WHERE parent_id =${id}`;
                    conn.query(worksql, (err, expData) => {
                        if (err) console.log('error is', err);
                        else resolve({
                            info: resp,
                            experience: expData
                        })
                    })
                }
            })
        })
    }

    static scheduleInterview(data) {
        return new Promise((resolve, reject) => {
            //save detaials of interview
            let companyId = data.user.result[0].company_id;
            let sql = `INSERT INTO candidate_Interview (ref_id, interviewer_id, interview_date, interview_time,
            interview_venue, interview_mode, interview_note, interview_status, company_id, created_on, updated_on)
            VALUES  (${data.referenceId}, ${data.staffId}, '${data.date}','${data.interview_Time}',
            '${data.interview_venue}','${data.interview_mode}','${data.interview_note}','P',${companyId},UNIX_TIMESTAMP(),
            UNIX_TIMESTAMP())`

            conn.query(sql, (err, resp) => {
                if (err) reject(err)
                else {

                    let jobSql = `SELECT jp.* FROM candid_ref AS cr 
                    LEFT JOIN job_posts AS jp ON jp.id = cr.job_id WHERE cr.id = ${data.referenceId}`;

                    conn.query(jobSql, (err, jobDetails) => {
                        if (err) reject(err)
                        CandidateRefBusiness.sendstaffMails(data, jobDetails[0]) //mail to staff for interview
                            .then(sMailed => {
                                CandidateRefBusiness.sendCandidateMails(data, jobDetails[0]) //mail to candid for interview
                                    .then(cMailed => {
                                        let intsql = `UPDATE candid_ref SET interview_status = 'P' WHERE id=${data.referenceId}`
                                        conn.query(intsql, (err, scheduledInterview) => {
                                            if (err) reject(err);
                                            console.log('mail sent', scheduledInterview)
                                            resolve(scheduledInterview)
                                        })
                                    })
                                    .catch(err => {
                                        reject(err)
                                    })
                            })
                            .catch(err => {
                                reject(err);
                            })
                    })
                }
            })
        })
    }

    static sendstaffMails(data, job) {
        return new Promise((resolve, reject) => {
            let pageLink = `${process.env.CLIENT_URL}pages/view-reference`;
            let jobLink = `${process.env.CLIENT_URL}pages/view-jobs`;
            let findUser = `SELECT * FROM users WHERE id = ${data.staffId}`
            conn.query(findUser, (err, staffDetails) => {
                if (err) console.log('error in finding staff', err);
                else {
                    let user = staffDetails[0]
                    var mailOptions = {
                        from: '"GPS " <vishulg@qexon.com>',
                        to: `${user.email}`,
                        subject: 'Interview Schedule',
                        html: `
                        <div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
                        <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
                           <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                           <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                             <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                             <div>
                               <p>Hello <b>${user.first_name}</b>,</p>
                               <p style="line-height: 1.2">  You have been invited to take the interview of a candidate on ${data.date}, ${data.interview_Time}
                               at ${data.interview_venue}. 
                               Please check the Detail's about post <a href='${jobLink}'>HERE</a> and update the status of your availablity for the interview. </p><br>
                               <center><a href= ${pageLink}><button style="background-color: #0052CC;font-family: Montserrat;color: white;cursor: pointer;font-weight: 700;margin: 0 2% 0 0;height: auto;border-radius: 4px;border: none;font-size: 17.5px; padding: 7px 15px;">
                               View Interview Requests</button></a></center>
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

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve({ msg: 'sent to staff' });
                        }
                    });
                }
            })
        })
    }

    static sendCandidateMails(data, job) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM candidateRef_basicInfo WHERE parent_id = ${data.referenceId}`
            conn.query(sql, (err, basicInfo) => {
                let candidate = basicInfo[0];
                var mailOptions = {
                    from: '"GPS " <vishulg@qexon.com>',
                    to: `${candidate.email}`,
                    subject: 'Interview Schedule',
                    html: `
                    <div class="container" style="font-family: Montserrat;color: #727c8f;font-size: 17px;">
                    <div class="row" style="margin-top:1em;width: calc(50% + 150px); margin: auto">
                    <div class="col-lg-2 col-sm-1 col-xs-1"></div>
                    <div class="col-lg-8 col-sm-10 col-xs-10" style="">
                        <hr style="margin-top:1em;border: 0.4px solid #727c8f;">
                        <div>
                        <p>Hello <b>${candidate.first_name}<b>,</p>
                        <p style="line-height: 1.2"> This mail is about application for the post of ${job.job_title}  in our company
                            We thank you for the same. We would like to inform you that your profile is shortlisted. Please report For the interview on ${data.date}  at ${data.interview_Time}
                            at the following address: <br>
                            ${data.interview_venue}
                            <br>
                        Please update for your availablity for the interview. </p><br>
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

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({ msg: 'message sent to candidate' });
                    }
                });
            })
        })
    }


    static getStaffInterviews(data) {
        return new Promise((resolve, reject) => {
            let staffDetails = data.user.result[0];
            console.log('staffDetails', staffDetails.id);
            let interviewerId = staffDetails.id;
            let sql = `SELECT crb.first_name, crb.last_name, cso.resume, ci.interview_date,ci.id,
            ci.interview_time, ci.interview_venue, ci.interview_mode FROM candidate_Interview AS ci 
            LEFT JOIN candidateRef_basicInfo AS crb ON crb.parent_id = ci.ref_id 
            LEFT JOIN candid_skills AS cs ON cs.parent_id = ci.ref_id 
            LEFT JOIN candid_social AS cso ON cso.parent_id = ci.ref_id 
            WHERE ci.interviewer_id = ${interviewerId} AND ci.interview_status = 'p';`
            conn.query(sql, (err, interview) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(interview);
                }
            })
        })
    }
}

module.exports = CandidateRefBusiness;