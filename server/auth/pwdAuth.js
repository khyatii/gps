var bcrypt = require('bcryptjs');
var conn = require('../config/database');
class PasswordMiddle {
    static passwordHash(req,res,next){
        var password = req.body.password;
        bcrypt.hash(password, 10, function(err, hash) {
           if(err){
            res.status(404).send(err);
            return;
           }
            req.body.password=hash
            next();
          });
    }
    static checkPassword(req,res,next){
      
        let guesspassword = req.body.password
        let sql =`SELECT pwd FROM users WHERE email = '${req.body.txtEmail}'`;

        conn.query(sql,(err,result)=>{
            
            if(err || result.length==0)
               {    
                   res.status(404).send('email not found')
                   return;
                }
         
            let orignalpwd = result[0].pwd;
            bcrypt.compare(guesspassword, orignalpwd, function(err,response) {
                console.log(response);
                if(response == true) 
                    next();
                else
                res.status(404).send('incorrect password')
            });
            
        })  
        
    }
}   

module.exports = PasswordMiddle