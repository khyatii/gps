const conn = require('../config/database');



class CandidateIntBusiness {

    static rejectInterview(data) {
        let interviewId = data.id;
        let sql = `UPDATE candidate_Interview SET interview_status = 'D' WHERE id = ${interviewId}`;

        return new Promise((resolve, reject) => {
            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else resolve(resp);
            })
        })
    }

    static saveInterviewRatings(data) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT ref_id, company_id FROM candidate_Interview WHERE id =${data.id}`;
            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                else {
                    var interviewData = resp[0];
                    var count = 0;
                    let skillsql = `INSERT INTO interview_ratings(skill,rating, remarks,
                    interview_id,company_id, reference_id, created_on, updated_on) VALUES`

                    data.ratings.forEach((obj, i) => {
                        count++;
                        skillsql += `('${obj.skill}', ${obj.rating}, '${obj.remarks}', ${data.id}, 
                        ${interviewData.company_id},${interviewData.ref_id},
                        UNIX_TIMESTAMP(),UNIX_TIMESTAMP())`
                        if (count == data.ratings.length) skillsql += `;`;
                        else skillsql += `,`;
                    })
                    conn.query(skillsql, (err, resp) => {
                        if (err) reject(err);
                        else {
                            //change status
                            let iSql = `UPDATE candidate_Interview SET interview_status = 'C' 
                            WHERE id = ${data.id} `;
                            conn.query(iSql, (err, resp) => {
                                if (err) reject(err)
                                else {
                                    let crfSql = `UPDATE candid_ref SET interview_status = 'C' WHERE id=${interviewData.ref_id} `;
                                    conn.query(crfSql, (err, changed) => {
                                        if (err) reject('error ', err)
                                        resolve(changed)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    static getHoldRef(data) {
        return new Promise((resolve, reject) => {

            let user = data.user.result[0];
            let sql = `SELECT cr.id, cb.first_name, cb.last_name, cb.phone,cb.email, cs.skills,
            cso.resume FROM candid_ref AS cr LEFT JOIN candidateRef_basicInfo AS cb
            ON cb.parent_id = cr.id LEFT JOIN candid_skills AS cs ON cs.parent_id =
            cr.id LEFT JOIN candid_social AS cso ON cso.parent_id = cr.id
            WHERE cr.company_id = ${user.company_id} AND cr.submit_status = 1 AND cr.interview_status ='H'`

            conn.query(sql, (err, candidateData) => {
                if (err) reject(err);
                else resolve(candidateData);
            })
        })
    }


    static getDeclineRef(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `SELECT cr.id, cb.first_name, cb.last_name, cb.phone,cb.email, cs.skills,
            cso.resume FROM candid_ref AS cr LEFT JOIN candidateRef_basicInfo AS cb
            ON cb.parent_id = cr.id LEFT JOIN candid_skills AS cs ON cs.parent_id =
            cr.id LEFT JOIN candid_social AS cso ON cso.parent_id = cr.id
            WHERE cr.company_id = ${user.company_id} AND cr.submit_status = 1 AND cr.interview_status ='D'`

            conn.query(sql, (err, candidateData) => {
                if (err) reject(err);
                else resolve(candidateData);
            })
        })
    }

    static getCompletedRef(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `SELECT cr.id, cb.first_name, cb.last_name, cb.phone,cb.email, cs.skills,
            cso.resume FROM candid_ref AS cr LEFT JOIN candidateRef_basicInfo AS cb
            ON cb.parent_id = cr.id LEFT JOIN candid_skills AS cs ON cs.parent_id =
            cr.id LEFT JOIN candid_social AS cso ON cso.parent_id = cr.id
            WHERE cr.company_id = ${user.company_id} AND cr.submit_status = 1 AND cr.interview_status ='C'`

            conn.query(sql, (err, candidateData) => {
                if (err) reject(err);
                else resolve(candidateData);
            })
        })
    }

    static getCandidRatings(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `SELECT ir.skill, ir.remarks, ir.rating FROM candidate_Interview AS ci 
            LEFT JOIN interview_ratings AS ir ON ir.interview_id = ci.id 
            WHERE ref_id = ${data.id}`

            conn.query(sql, (err, ratingresp) => {
                if (err) reject('error is ', err);
                else {
                    let candidsql = `SELECT * FROM candidateRef_basicInfo WHERE parent_id = ${data.id}`
                    conn.query(candidsql, (err, candidInfo) => {
                        if (err) reject(err)
                        else resolve({
                            candidate: candidInfo,
                            ratings: ratingresp
                        });
                    })
                }
            })
        })
    }

    static postJobs(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            try{
                let sql = `INSERT INTO job_posts (job_title, company_id, job_Location, experience, salary_from, salary_to, 
                    salary_duration, roles_responsibilities, job_description, skills, job_type, created_on, updated_on, experience_duration, vacancy)
                    VALUES ('${data.jobTitle}',${user.company_id}, '${data.location}','${data.experience}', ${data.salaryFrom}, ${data.salaryTo},
                    '${data.salryD}','${data.roleandResp}', '${data.jd}', '${data.skills}', '${data.jobTypes.toString()}',
                    UNIX_TIMESTAMP(), UNIX_TIMESTAMP(),'${data.experience_D}', ${data.vacancy} )`
                    
                    conn.query(sql, (err, resp) => {
                        if (err) reject(err);
                        else resolve(resp);
                    })
                }
            catch(err){
                console.log('error  is ',err)
                reject(err);                
            }
        })
    }

    static seeJobs(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `SELECT * FROM job_posts WHERE company_id = ${user.company_id} AND status = 'A' `;

            conn.query(sql, (err, resp) => {
                if (err) reject(err)
                else resolve(resp);
            })
        })
    }


    static getAllRef(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `SELECT cr.id, cr.interview_status, cb.first_name, cb.last_name, cb.phone,cb.email, cs.skills,
                    cso.resume FROM candid_ref AS cr LEFT JOIN candidateRef_basicInfo AS cb
                    ON cb.parent_id = cr.id LEFT JOIN candid_skills AS cs ON cs.parent_id =
                    cr.id LEFT JOIN candid_social AS cso ON cso.parent_id = cr.id
                    WHERE cr.company_id = ${user.company_id} AND cr.submit_status = 1`;

            conn.query(sql, (err, candidateData) => {
                if (err) reject(err);
                else resolve(candidateData);
            })
        })
    }

    static getAllJobs(data) {
        let user = data.user.result[0];
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM job_posts WHERE company_id = ${user.company_id}`;
            conn.query(sql, (err, resp) => {
                if (err) reject(ere)
                resolve(resp)
            })
        })
    }

    static jobchangeStatus(data) {
        return new Promise((resolve, reject) => {
            let user = data.user.result[0];
            let sql = `UPDATE job_posts SET status = '${data.jstatus}' WHERE id = ${data.jid}
             AND company_id = ${user.company_id}`;
             
            conn.query(sql, (err, resp) => {
                if (err) reject(err);
                resolve(resp);
            })
        })
    }
}

module.exports = CandidateIntBusiness;