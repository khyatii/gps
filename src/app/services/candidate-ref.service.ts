import { Injectable } from '@angular/core';
import { CandidateCommonService } from "./candidateCommon.service";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class CandidateRefService extends CandidateCommonService {

  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }

  postBasicInfo(basicInfo){
    return super.postValue(basicInfo,'candidateRef/basicInfo');
  }

  postQualification(qualification){
    return super.postValue(qualification,'candidateRef/qualification');
  }

  postSkills(skills){
    return super.postValue(skills,'candidateRef/skills');
  }

  postExperience(exp){
    return super.postValue(exp,'candidateRef/experience');
  }
  postSocial(data){
    return super.postValue(data,'candidateRef/social');
  }
  postDecryptLink(link){
    return super.postValue(link,'candidateRef/decrypt');
  }

  //for admin end    
  getNewReferences(){
    return super.getValue('candidateRef/getReference')
  }

  declineReference(refId){
    return super.postValue(refId,'candidateRef/declineRef')
  }

  holdReference(refId){
    return super.postValue(refId,'candidateRef/holdRef');
  }
  getReferenceDetails(refId){
    return super.postValue(refId,'candidateRef/refInfo')
  }

  scheduleInterview(data){
    return super.postValue(data,'candidateRef/scheduleInterview')
  }

  getInterviewerDetails(){
    return super.getValue('candidateRef/getInterviewDetails')
  }
  
  rejectInterview(data){
    return super.postValue(data,'candidateInt/rejectInterview');
  }

  saveCandidateRatings(data){
    return super.postValue(data,'candidateInt/saveInterviewRatings');
  }

  getCompletedRef(){
     return super.getValue('candidateInt/getCompletedCandidates');
  }

  getdeclinedRef(){
     return super.getValue('candidateInt/getRejectCandidates');
  }

  getHoldRef(){
     return super.getValue('candidateInt/getHoldCandidates');
  }

  getCandidateRatings(data){
    return super.postValue(data,'candidateInt/getCandidRatings');
  }

  postJobs(data){
    return super.postValue(data,'candidateInt/postJobs');
  }

  viewJobs(){
    return super.getValue('candidateInt/viewJobs')
  }

  getAllRef(){
    return super.getValue('candidateInt/getAllRef');
  }

  getAllJobs(){
    return super.getValue('candidateInt/getAllJobs')
  }

  changeJobStatus(data){
    return super.postValue(data,'candidateInt/jobchangeStatus');
  }

}
