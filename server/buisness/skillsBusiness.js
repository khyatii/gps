var conn = require('../config/database');
var Request = require("request");

class skillsBusiness {

    static getSkills(data) {
        //console.log('Ankit data')
        //console.log(userData.user.result[0].company_id);
        return new Promise((resolve, reject) => {    
            let value = data['q'];
            Request.get(`https://stackoverflow.com/filter/tags?q=${value}&newstyle=true&_=1547012835384`, (error, response, body) => {
                if(error) {
                    retject(error);
                }        
                resolve(JSON.parse(body))
            });
        })
    }
    
}
module.exports = skillsBusiness;