import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class OthersService extends CommonService {

    constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
        super(http,ngRedux);
    }
    saveMeetings(value) {
        return super.postValue(value, 'saveMeetings');
    }
    viewMeetings() {
        return super.getValue('viewMeetings');
    }
    getOneMeeting(value) {
        return super.postValue(value, 'getOneMeeting');
    }
    updateMeetings(value) {
        return super.postValue(value, 'updateMeetings');
    }
    deleteMeetings(value) {
        return super.postValue(value, 'deleteMeetings');
    }
    updateMeetingStatus(value) {
        return super.postValue(value, 'updateMeetingStatus');
    }

    emailBroadcast(value) {
        return super.postValue(value, 'emailBroadcast');
    }
    smsBroadcast(value) {
        return super.postValue(value, 'smsBroadcast');
    }
    getBroadcast() {
        return super.getValue('getBroadcast');
    }
    getOneBroadcast(value) {
        return super.postValue(value, 'getOneBroadcast');
    }

    postQuestion(value) {
        return super.postValue(value, 'postQuestion');
    }
    viewQuestionnaire() {
        return super.getValue('viewQuestionnaire');
    }
    deleteQuestionnaire(value) {
        return super.postValue(value, 'deleteQuestionnaire');
    }
    getOneQuestion(value) {
        return super.postValue(value, 'getOneQuestion');
    }
    updateQuestion(value) {
        return super.postValue(value, 'updateQuestion');
    }
    updateLikes(value) {
        return super.postValue(value, 'updateLikes');
    }
    updateDisLikes(value) {
        return super.postValue(value, 'updateDisLikes');
    }
    postComments(value) {
        return super.postValue(value, 'postComments');
    }
    viewComments() {
        return super.getValue('viewComments');
    }
    viewLikesStatus(val) {
        return super.postValue(val, 'viewLikesStatus');
    }
    viewOneQuestionnaire(value) {
        return super.postValue(value, 'viewOneQuestionnaire');
    }
    likesCount(value) {
        return super.postValue(value, 'likesCount');
    }
    countComments() {
        return super.getValue('countComments');
    }
    countLikesStatus() {
        return super.getValue('countLikesStatus');
    }

}