var ModuleBuisness = require('../buisness/moduleBuisness');
var promise = require('promise');
var async = require('async');
var conn = require('../config/database');
class ModuleController {
    static getModules(req, res, next) {
        ModuleBuisness.getAll()
            .then(data => { res.status(200).send(data) })
            .catch((err) => {
                if (err.errno == 1062) {
                    res.status(405).send(err);
                    return;
                }
                res.status(404).send(err);
            })
    }
    static getPages(req, res, next) {
        ModuleBuisness.getPages(req.body)
            .then(data => { res.status(200).send(data) })
            .catch((err) => {
                res.status(404).send(err);
            })
    }

    static getAllPages(req, res, next) {
        //console.log(req.body)
        ModuleBuisness.getAllPages(req.body)
            .then(data => { res.status(200).send(data) })
            .catch((err) => {
                res.status(404).send(err);
            })
    }

    static getModule(req, res, next) {
        ModuleBuisness.getModule(req.body)
            .then(data => { res.status(200).send(data) })
            .catch((err) => {
                res.status(404).send(err);
            })
    }

    static getRoleAccessedModules(req, res, next) {
        ModuleBuisness.getRoleAccessedModules(req.body)
            .then(data => { res.status(200).send(data) })
            .catch((err) => {
                res.status(404).send(err);
            })
    }

    static getUserPages(req, res, next) {
        //console.log(req.body.user.result[0])
        if(req.body.user.result[0].user_type  == 'U'){
            let roleId = req.body.roleId;
            let sql = `select m.id module_id,m.name module_name,p.id page_id,p.name page_name,p.url,pr.user_role_id,
            m.icon_class module_class,p.icon_class page_class from pages_role pr 
            left join pages p on p.id = pr.page_id
            left join module_role mr on mr.id = pr.module_role_id
            left join module m on m.id = mr.module_id
            left join user_role ur on ur.id = pr.user_role_id
            left join users u on u.id = ur.user_id
            left join role r on r.id = ur.role_id
            where pr.user_role_id = ${roleId} AND pr.company_id= ${req.body.user.result[0].company_id} AND
            mr.company_id = ${req.body.user.result[0].company_id} AND pr.is_permission != 'N' order by mr.sort_order ASC, pr.sort_order ASC`;
            // console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) {
                    res.status(401).json({
                        "message": err
                    })
                }
                res.status(200).json(result)
            })
        }
        else{
            let sql = `select m.id module_id,m.name module_name,p.id page_id,p.name page_name,p.url,
            m.icon_class module_class,p.icon_class page_class from pages p
            left join module m on m.id = p.module_id order by p.sort_order,module_name ASC`;
            // console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) {
                    res.status(401).json({
                        "message": err
                    })
                }
                res.status(200).json(result)
            })
        }
    }

    //getRoleAccessedModules

    static deleteAllPreviousPageRecord(roleId, moduleId) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM pages_role WHERE user_role_id = ${roleId} AND module_role_id = ${moduleId};`
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

    static deleteAllPreviousModuleRecord(roleId) {
        console.log(roleId)
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM module_role WHERE role_id = ${roleId};`
            console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                console.log(result)
                resolve(result);
            })
        })
    }

    static checkIfPagesExist(data) {
        console.log(data)
        let roleId = data.optRoleId;
        let moduleId = data.optModuleId;
        return new promise((resolve, reject) => {
            let sql = `select * FROM pages_role WHERE user_role_id = ${roleId} AND module_role_id = ${moduleId} AND
            company_id = ${data.user.result[0].company_id};`
            console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        }).catch(err=>{
            reject(err)
        })
    }

    static checkIfModuleRecordExist(data) {
        //console.log(roleId)
        let roleId = data.optModuleRoleId;
        return new promise((resolve, reject) => {
            let sql = `select * FROM module_role AS mr WHERE role_id = ${roleId} AND mr.company_id= ${data.user.result[0].company_id};`
            //console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                    return;
                }
                //console.log(result)
                resolve(result);
            })
        })
    }

    //saveModulesAccess
    static savePageAccess(req, res, next) {
        let roleId = req.body.optRoleId;
        let moduleId = req.body.optModuleId;
        const dataList = req.body['dataList'];
        // console.log('asdsa')
        ModuleController.checkIfPagesExist(req.body).then(data => {
            console.log(data.length);
            if(data.length == 0){
                let sql = `INSERT INTO pages_role (page_id, user_role_id, module_role_id, is_permission, created_at, updated_at,sort_order,
                    company_id) VALUES`;
                
                let length = dataList.length;
                let count = 0;
                dataList.forEach(value => {
                    count++;
                    sql += `(${value.id}, ${roleId}, ${moduleId}, '${value.is_permission}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),${value.sort_order},
                    ${req.body.user.result[0].company_id})`
                    if (count == length) sql += `;`;
                    else sql += `,`;
                });
                conn.query(sql, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            "message": err
                        })
                    }
                    res.status(200).json({
                        "message": "saved"
                    })
                })
            }
            else{
                let sql = '';
                let length = dataList.length;
                let count = 0;
                dataList.forEach(value => {
                    sql = 'UPDATE pages_role SET sort_order = '+ value.sort_order +',is_permission =  "'+value.is_permission+'" '+
                            'WHERE user_role_id = '+roleId +' AND module_role_id = '+ moduleId +' AND page_id = '+ value.id +' AND '+
                            'company_id = '+req.body.user.result[0].company_id;
                            //console.log(sql)
                    conn.query(sql, (err, result) => {
                        if (err) {
                            res.status(401).json({
                                "message": err
                            })
                        }
                    })
                });
                //console.log('emd')
                res.status(200).json({
                    "message": "updated"
                })
            }
        }).catch(err=>{
            res.status(404).json({
                "message": "error",
                "err" : err
            })
        })
    }


    static saveModulesAccess(req, res, next) {
        let roleId = req.body.optModuleRoleId;
        //console.log(req.body)
        ModuleController.checkIfModuleRecordExist(req.body).then(data => {
            // console.log(data.length)
            if(data.length == 0){
                let sql = `INSERT INTO module_role (role_id, module_id, is_permission, created_at, updated_at, sort_order,company_id) VALUES`;
                
                const dataList = req.body['moduleList'];
                let length = dataList.length;
                let count = 0;
                //console.log(dataList);
                dataList.forEach(value => {
                    count++;
                    //console.log('asdasd')
                    sql += `(${roleId}, ${value.id}, '${value.is_permission}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),${value.sort_order},
                    ${req.body.user.result[0].company_id})`
                    if (count == length) sql += `;`;
                    else sql += `,`;
                    // console.log('asdasd')
                });
                //console.log(sql)
                conn.query(sql, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            "message": err
                        })
                    }
                    res.status(200).json({
                        "message": "saved"
                    })
                })
            }
            else{
                let sql = '';
                const dataList = req.body['moduleList'];
                let length = dataList.length;
                let count = 0;
                dataList.forEach(value => {
                    sql = 'UPDATE module_role SET sort_order = '+ value.sort_order +',is_permission =  "'+value.is_permission+'" '+
                            'WHERE role_id = '+roleId +' AND module_id = '+ value.id +'; ';
                    conn.query(sql, (err, result) => {
                        if (err) {
                            res.status(401).json({
                                "message": err
                            })
                        }
                    })
                });
                //console.log('emd')
                res.status(200).json({
                    "message": "updated"
                })
            }
        }).catch((err)=>{  
            console.log(err)
            res.status(404).send(err);
        })  
    }
}

module.exports = ModuleController;