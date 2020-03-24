import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';
@Injectable()
export class UserService extends CommonService {

  constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
    super(http,ngRedux);
  }
  postLogin(value) {
    return super.postValue(value, 'users/login');
  }
  postSignup(value) {
    return super.postValue(value, 'users/signup');
  }
  getCountry() {
    return super.getValue('location');
  }
  getState(id) {
    return super.getValue(`location/${id}`);
  }
  getCity(id) {
    return super.getValue(`location/cities/${id}`);
  }
  getRoles() {
    return super.getValue(`users/getAllRoles`);
  }
  getLoginUser() {
    return super.getValue(`users/getLoginUser`);
  }
  getAllUsers(token) {
    return super.postValue(token, 'users/getAllUsers');
  }
  postImage(image) {
    return super.postValue(image, 'users/updateProfile');
  }
  getProfileImage() {
    return super.getValue('users/getProfileImage');
  }
  getSelectedUserProfileImage(id) {
    return super.getValue(`users/getSelectedUserProfileImage/${id}`);
  }
  getSelectedUserContactDetails(id) {
    return super.getValue(`users/getSelectedUserContactDetails/${id}`);
  }
  getUserData(id) {
    return super.getValue(`users/getData/${id}`);
  }
  getMultipleUserData(id) {
    return super.postValue(id, `users/getMultipleUserData`);
  }
  postUserData(value) {
    return super.postValue(value, 'users/updateUserData');
  }
  getJobDetail() {
    return super.getValue(`users/getJobDetail`);
  }
  getSelectedUserJobDetail(id) {
    return super.getValue(`users/getSelectedUserJobDetail/${id}`);
  }
  postJobDetail(value) {
    return super.postValue(value, `users/postJobDetail`);
  }
  postContactDetail(value) {
    return super.postValue(value, 'users/postContactDetail');
  }
  getUserRoles(value) {
    return super.postValue(value, 'getUserRoles');
  }
  getCompanyUsers() {
    return super.getValue(`getCompanyUsers`);
  }
  deleteUser(value) {
    return super.postValue(value, 'users/deleteUser');
  }
  userInvitation(value) {
    return super.postValue(value, 'userInvitation');
  }
  saveInvitedUser(value) {
    return super.postValue(value, 'saveInvitedUser');
  }
  getInvitationLinkDetails(value) {
    return super.postValue(value, 'getInvitationLinkDetails');
  }
  forgotPassword(value) {
    return super.postValue(value, 'forgotPassword');
  }
  setPassword(value) {
    return super.postValue(value, 'setPassword');
  }
  checkTokenExpire(value) {
    return super.postValue(value, 'checkTokenExpire');
  }
  candidateInvitation(value) {
    return super.postValue(value, 'candidateInvitation');
  }
  getContactDetails() {
    return super.getValue('users/getContactDetails');
  }
  // getSelectedUserContactDetails(id){
  //   return super.getValue(`users/getContactDetails/${id}`);
  // }
}
