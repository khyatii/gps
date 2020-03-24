import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommonService } from "./commonService";
import { Http } from "@angular/http";
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/reducer';

@Injectable()
export class HrmService extends CommonService {

    constructor(http: Http,ngRedux:NgRedux<IAppState>) { 
        super(http,ngRedux);
      }
    private hrmSource = new BehaviorSubject(true);
    accessStatus = this.hrmSource.asObservable();

    getHrmStatus(status: boolean) {
        this.hrmSource.next(status)
    }
    getAttendance(value) {
        return super.postValue(value, 'getAttendance');
    }
    getAttendanceTime(value) {
        return super.postValue(value, 'getAttendanceTime');
    }
    postPunchInTime(value) {
        return super.postValue(value, 'postPunchInTime');
    }
    postPunchOutTime(value) {
        return super.postValue(value, 'postPunchOutTime');
    }
    adminAttendaceRecord(value) {
        return super.postValue(value, 'adminAttendaceRecord');
    }

    viewFiscalYear() {
        return super.getValue('viewFiscalYear');
    }
    fiscalYear(value) {
        return super.postValue(value, 'fiscalYear');
    }
    deleteFiscalYear(value) {
        return super.postValue(value, 'deleteFiscalYear');
    }
    getOneFiscalYear(value) {
        return super.postValue(value, 'getOneFiscalYear');
    }
    updateFiscalYear(value) {
        return super.postValue(value, 'updateFiscalYear');
    }

    addLeaveType(value) {
        return super.postValue(value, 'addLeaveType');
    }
    viewLeaveType() {
        return super.getValue('viewLeaveType');
    }
    deleteLeaveType(value) {
        return super.postValue(value, 'deleteLeaveType');
    }
    getOneLeaveType(value) {
        return super.postValue(value, 'getOneLeaveType');
    }
    updateLeaveType(value) {
        return super.postValue(value, 'updateLeaveType');
    }

    addHolidays(value) {
        return super.postValue(value, 'addHolidays');
    }
    viewHolidays() {
        return super.getValue('viewHolidays');
    }
    getOneHoliday(value) {
        return super.postValue(value, 'getOneHoliday');
    }
    updateHolidays(value) {
        return super.postValue(value, 'updateHolidays');
    }
    deleteHolidays(value) {
        return super.postValue(value, 'deleteHolidays');
    }

    getStaffDetails() {
        return super.getValue('getStaffDetails');
    }
    getWeekDays() {
        return super.getValue('getWeekDays');
    }
    addWeekDays(value) {
        return super.postValue(value, 'addWeekDays');
    }
    deleteWeekDays(value) {
        return super.postValue(value, 'deleteWeekDays');
    }
    getOneWeekDay(value) {
        return super.postValue(value, 'getOneWeekDay');
    }
    modifyWeekDays(value) {
        return super.postValue(value, 'modifyWeekDays');
    }

    addEntitlements(value) {
        return super.postValue(value, 'addEntitlements');
    }
    getEntitlements() {
        return super.getValue('getEntitlements');
    }
    deleteEntitlements(value) {
        return super.postValue(value, 'deleteEntitlements');
    }
    getOneEntitlement(value) {
        return super.postValue(value, 'getOneEntitlement');
    }
    modifyEntitlements(value) {
        return super.postValue(value, 'modifyEntitlements');
    }

    getLeavesList() {
        return super.getValue('getLeavesList');
    }
    getAdminLeaveList() {
        return super.getValue('getAdminLeaveList');
    }
    getLeavesListByDate(value) {
        return super.postValue(value, 'getLeavesListByDate');
    }
    applyLeaves(value) {
        return super.postValue(value, 'applyLeaves');
    }
    applyLeavesAdmin(value) {
        return super.postValue(value, 'applyLeavesAdmin');
    }
    getUserLeaveType() {
        return super.getValue('getUserLeaveType');
    }
    getUserLeaveBalance(value) {
        return super.postValue(value, 'getUserLeaveBalance');
    }
    getUserLeaveBalanceAdmin(value) {
        return super.postValue(value, 'getUserLeaveBalanceAdmin');
    }
    updateStatusLeaves(value) {
        return super.postValue(value, 'updateStatusLeaves');
    }
    getStaffDetail(value) {
        return super.postValue(value, 'getStaffDetail');
    }
    updateAdminStatusLeaves(value) {
        return super.postValue(value, 'updateAdminStatusLeaves');
    }
    getUserLeaveTypeAdmin(value) {
        return super.postValue(value, 'getUserLeaveTypeAdmin');
    }

}