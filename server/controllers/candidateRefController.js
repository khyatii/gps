var CandidateRefBusiness = require('../buisness/candidateRefBusiness');

class CandidateRefController{

    static basicInfo(req,res){ //sets up basic info
        CandidateRefBusiness.postBasicInfo(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err)});
    }
    static qualification(req,res){
        CandidateRefBusiness.postQualification(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err)});
    }
    static skills(req,res){
        CandidateRefBusiness.PostSkills(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err)});
    }
    
    static workExp(req,res){
        CandidateRefBusiness.postWorkExperience(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err)});
    } 

    static social(req,res){
        CandidateRefBusiness.PostSocial(req.files,req.body)
        .then(data=>{ res.status(200).send(data) }) 
        .catch(err=>{res.status(400).send(err)});
    }       

    static candidateInvitation(req,res){
        CandidateRefBusiness.candidateInvitation(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err)});
    }

    static decryptUser(req,res){
        CandidateRefBusiness.decryptUserLink(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{res.status(400).send(err) });
    }

    static getReference(req,res){
        CandidateRefBusiness.getCompanyRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }
    static declineCandidRef(req,res){
        CandidateRefBusiness.declineRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }
    
    static holdCandidRef(req,res){
        CandidateRefBusiness.holdRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }
    
    static referenceInfo(req,res){
        CandidateRefBusiness.getoneRefInfo(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }
    
    static scheduleInterview(req,res){
        CandidateRefBusiness.scheduleInterview(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }

    static staffInterviews(req,res){
        CandidateRefBusiness.getStaffInterviews(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }
}

module.exports = CandidateRefController;