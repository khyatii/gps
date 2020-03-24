var conn = require('../config/database');
var promise = require('promise');

class iwinBusiness {
    static saveIwin(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO iwin(title,description,role_id,user_id,user_name,author_id,author,company_id,date,status,category,created_on,updated_on)
            VALUES('${data.title}','${data.desc}','${data.roles}','${data.staffId}','${data.user_name}',
            '${data.user.result[0].id}','${data.user.result[0].first_name} ${data.user.result[0].last_name}',
            '${data.user.result[0].company_id}','${data.date}','pending','${data.category}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "data": 1 });
            })
        })
    }

    static showIwinRecords(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM iwin WHERE company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }
    static getOneIwin(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM iwin WHERE id=${data.id};`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }
    static updateIwin(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE iwin set title = '${data.title}',description= '${data.desc}',role_id='${data.roles}',
            user_id='${data.staffId}',user_name='${data.user_name}',company_id='${data.user.result[0].company_id}',
            author_id='${data.user.result[0].id}',author='${data.user.result[0].first_name} ${data.user.result[0].last_name}',
            date='${data.date}',category='${data.category}',updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            })
        })

    }
    static deleteIwin(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM iwin WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getIwinRequests(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM iwin WHERE user_id= '${data.user.result[0].id}' AND
             company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateIwinStatus(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE iwin set status = '${data.statusChange}',updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

}
module.exports = iwinBusiness