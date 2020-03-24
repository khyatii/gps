var conn = require('../config/database');

class RoleBuisness {

    static save(userData) {
        return new Promise((resolve, reject) => {
            RoleBuisness.checkIfroleExists(userData).then(res => {
                if (res.length == 0) {
                    let query = `INSERT INTO role ( name, des,created_on,updated_on,company_id) 
                    VALUES ('${userData.txtRole}', '${userData.txtDesc}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(), 
                    ${userData.user.result[0].company_id})`
                    //console.log(query)
                    conn.query(query, (err, doc) => {
                        if (err) {
                            reject(err)
                            return;
                        }
                        resolve(doc);
                    })
                }
                else {
                    reject('role already exists');
                }
            })

        })
    }

    static checkIfroleExists(data) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM role WHERE name = '${data.txtRole}' AND company_id = ${data.user.result[0].company_id}`;
            // console.log(query)
            conn.query(query, (err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            })
        })
    }

    static insertRole(userData) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE users.email = '${userData.txtEmail}'`;
            // console.log(userData);
            // console.log(sql)
            conn.query(sql, (err, result) => {
                let query = `INSERT INTO user_role ( user_id, role_id, company_id,created_on,updated_on) 
                    VALUES (${result[0].id}, '${userData.txtRole}', '${result[0].company_id}','${Date.now()}','${Date.now()}')`
                    // console.log(sql);
                conn.query(query, (err, doc) => {
                    if (err) {
                        reject(err)
                        return;
                    }
                    //console.log(doc)
                    resolve({
                        msg: 'saved',
                        data: doc
                    });
                })
            })
        })
    }

    static getAllRoles(data) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM role WHERE company_id = ${data.user.result[0].company_id}`;
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

    static getUserRoles(data) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT company_id FROM user_role WHERE role_id='${data.roleId}' AND company_id='${data.user.result[0].company_id}';`;
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                } else {
                    if (result.length !== 0) {
                        let sql1 = `SELECT * FROM users WHERE company_id='${result[0].company_id}';`;
                        conn.query(sql1, (err, result1) => {
                            if (err) {
                                reject(err)
                                return;
                            }
                            resolve(result1);
                        });
                    }
                }
            })
        })
    }

    static update(data) {
        //console.log(data)
        return new Promise((resolve, reject) => {
            let sql = `UPDATE role SET name = '${data.txtRole}', des = '${data.txtDesc}' WHERE id = ${data.id}`;
            //console.log(sql)
            conn.query(sql, (err, doc) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(doc);
            })
        }).catch(err => {
            reject(err)
        })
    }

    static getRoleInfo(data) {
        //console.log(data.params['id']);
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM role WHERE id = ${data.params['id']}`;
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
}
module.exports = RoleBuisness;