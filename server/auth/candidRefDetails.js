const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


class candidRefDetails{
    static getUserDetails(req,res,next){
        const encryptedDetails = req.headers.candidrefurl
        const decryptedString =  String(cryptr.decrypt(encryptedDetails));
        let dataArr = decryptedString.split('?');
        let refobj = {};
        refobj['email'] = dataArr[0];
        refobj['userId'] = dataArr[1];
        refobj['jobId'] = dataArr[2];
        refobj['companyId'] = dataArr[3];
        refobj['invitaionId'] = dataArr[4];
        req.body.refDetails = refobj;
        next()
    }
}

module.exports = candidRefDetails;