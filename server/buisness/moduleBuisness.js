var conn = require('../config/database');
var promise = require('promise');

class ModuleBuisness {   

    static getAll(){
        return new promise((resolve,reject)=>{
            let sql = `SELECT * from module`
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    } 

    static getRoleAccessedModules(data){
        return new promise((resolve,reject)=>{
            let sql = `SELECT m.id ,m.name ,mr.is_permission,mr.id module_role_id FROM module_role AS mr
            LEFT JOIN module m ON m.id = mr.module_id
            LEFT JOIN role r ON r.id = mr.role_id
            WHERE r.id = ${data.roleId} AND mr.is_permission != 'N'`
            //console.log(sql)
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    } 

    static getModule(data){
        return new promise((resolve,reject)=>{
            ModuleBuisness.getRoleModules(data)
            .then(result =>{
                if(result.length > 0) return resolve(result);
                else{
                    return ModuleBuisness.getModulesWithoutRoles(data).then(resultnew =>{
                        return resolve(resultnew);
                    })
                }
            })     
            .catch((err)=>{  
                res.status(404).send(err);
            })  
        })  
    }

    static getModulesWithoutRoles(data){
        return new promise((resolve,reject)=>{
            let sql = `SELECT m.id module_id,m.name module_name, 'N' AS is_permission FROM module AS m`
            //console.log(sql)
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }       

    static getRoleModules(data){ 
        return new promise((resolve,reject)=>{
            let sql = `SELECT m.id module_id,m.name module_name,mr.is_permission FROM module_role AS mr
            LEFT JOIN module m ON m.id = mr.module_id
            LEFT JOIN role r ON r.id = mr.role_id
            WHERE r.id = ${data.roleId} AND mr.company_id = ${data.user.result[0].company_id} order by mr.sort_order`
            //console.log(sql);
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }

    static getPages(data){
        return new promise((resolve,reject)=>{
            ModuleBuisness.getPageRolePages(data)
            .then(result =>{
                if(result.length > 0) return resolve(result);
                else{
                    return ModuleBuisness.getPagesWithoutRoles(data).then(resultnew =>{
                        return resolve(resultnew);
                    })
                }
            })     
            .catch((err)=>{  
                res.status(404).send(err);
            })  
        })  
    }

    static getPagesWithoutRoles(data){
        return new promise((resolve,reject)=>{
            let sql = `select p.id page_id,p.name page_name,'N' AS is_permission from pages AS p 
            left join module AS m ON m.id = p.module_id where p.module_id = ${data.moduleId}`
            //console.log(sql)
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }       

    static getPageRolePages(data){
        //console.log('asdas')
        return new promise((resolve,reject)=>{
            let sql = `select p.id page_id,p.name page_name,pr.is_permission from pages_role AS pr 
            left join pages AS p on p.id = pr.page_id
            where pr.module_role_id = ${data.moduleRoleId} AND pr.user_role_id = ${data.roleId} order by pr.sort_order`
            //console.log(sql);
            conn.query(sql,(err,result)=>{
                if(err)
                {
                    reject(err)
                    return;
                }
                resolve(result);
            })
        })
    }       
}
module.exports = ModuleBuisness