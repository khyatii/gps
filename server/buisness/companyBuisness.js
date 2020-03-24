var conn = require('../config/database');
var UserBuisness = require('./userBuisness');
class CompanyBuisness {
    static signup(companyData) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO company_profile (name, authorised_name, email, pwd, country,state,
                city, zipcode,address,mobile_no,work_no,office_no,created_on,updated_on)
            VALUES ( '${companyData.txtCompanyName}', '${companyData.txtAuthorizedCompanyName}', '${companyData.txtEmail}', 
            '${companyData.password}', '${companyData.txtCountry}', '${companyData.txtState}', '${companyData.txtCity}', 
            '${companyData.txtZipcode}','${companyData.txtAddress1} ${companyData.txtAddress2}' ,'${companyData.txtMobile}',
            '${companyData.txtWorkNo}','${companyData.txtOfficeNo}',UNIX_TIMESTAMP() ,UNIX_TIMESTAMP())`
            conn.query(sql, (err, result) => {
                if (err) {
                    if (err.errno == 1062) {
                        reject(err);
                        return;
                    }
                    reject(err);
                    return;
                }
                this.companyAsUser(companyData)
                    .then((token) => resolve(token))
                    .catch(err => reject(err));
            })
        })
    }

    static companyAsUser(data) {
        return new Promise((resolve, reject) => {

            data.txtFirstName = data.txtCompanyName;
            data.user_type = 'A'
            UserBuisness.userSignup(data)
                .then(res => {

                    UserBuisness.generateToken(data)
                        .then((response) => resolve(response))
                        .catch((error) => reject(err));
                })
                .catch(err => reject(err))

        })
    }


}

module.exports = CompanyBuisness
