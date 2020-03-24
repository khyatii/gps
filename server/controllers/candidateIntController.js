var CandidateIntBusiness = require('../buisness/candidateIntBusiness');

class CandidateIntController{
    
    static rejectInterview(req,res){
        CandidateIntBusiness.rejectInterview(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });
    }

    static saveInterviewRatings(req,res){
        CandidateIntBusiness.saveInterviewRatings(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static getHoldRef(req,res){
        CandidateIntBusiness.getHoldRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static getDeclineRef(req,res){
        CandidateIntBusiness.getDeclineRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static getCompletedRef(req,res){
        CandidateIntBusiness.getCompletedRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }
    
    static getCandidRatings(req,res){
        CandidateIntBusiness.getCandidRatings(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }
    
    static postJobs(req,res){
        CandidateIntBusiness.postJobs(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static seeJobs(req,res){
        CandidateIntBusiness.seeJobs(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static getAllRef(req,res){
        CandidateIntBusiness.getAllRef(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }

    static getAllJobs(req,res){
        CandidateIntBusiness.getAllJobs(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }
    static jobchangeStatus(req,res){
        CandidateIntBusiness.jobchangeStatus(req.body)
        .then(data=>{ res.status(200).send(data) })
        .catch(err=>{ res.status(400).send(err) });   
    }
    
}

module.exports = CandidateIntController;