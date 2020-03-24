var HrmBuisness = require('../buisness/hrmBuisness')
class HrmController {
    static postPunchInTime(req, res) {
        HrmBuisness.punchInTime(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static postPunchOutTime(req, res) {
        HrmBuisness.punchOutTime(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getAttendance(req, res) {
        HrmBuisness.getAttendance(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getAttendanceTime(req, res) {
        HrmBuisness.getAttendanceTime(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static adminAttendaceRecord(req, res) {
        HrmBuisness.adminAttendaceRecord(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

    static fiscalYear(req, res) {
        HrmBuisness.postFiscalYear(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(400).send(err))
    }
    static viewFiscalYear(req, res) {
        HrmBuisness.viewFiscalYear(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteFiscalYear(req, res) {
        HrmBuisness.deleteFiscalYear(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneFiscalYear(req, res) {
        HrmBuisness.getOneFiscalYear(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateFiscalYear(req, res) {
        HrmBuisness.updateFiscalYear(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static addLeaveType(req, res) {
        HrmBuisness.addLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewLeaveType(req, res) {
        HrmBuisness.viewLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteLeaveType(req, res) {
        HrmBuisness.deleteLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneLeaveType(req, res) {
        HrmBuisness.getOneLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateLeaveType(req, res) {
        HrmBuisness.updateLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static addHolidays(req, res) {
        HrmBuisness.addHolidays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static viewHolidays(req, res) {
        HrmBuisness.viewHolidays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneHoliday(req, res) {
        HrmBuisness.getOneHoliday(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateHolidays(req, res) {
        HrmBuisness.updateHolidays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteHolidays(req, res) {
        HrmBuisness.deleteHolidays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

    static getStaffDetails(req, res) {
        HrmBuisness.getStaffDetails(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static addWeekDays(req, res) {
        HrmBuisness.addWeekDays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getWeekDays(req, res) {
        HrmBuisness.getWeekDays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteWeekDays(req, res) {
        HrmBuisness.deleteWeekDays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneWeekDay(req, res) {
        HrmBuisness.getOneWeekDay(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static modifyWeekDays(req, res) {
        HrmBuisness.modifyWeekDays(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

    static addEntitlements(req, res) {
        HrmBuisness.addEntitlements(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getEntitlements(req, res) {
        HrmBuisness.getEntitlements(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static deleteEntitlements(req, res) {
        HrmBuisness.deleteEntitlements(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getOneEntitlement(req, res) {
        HrmBuisness.getOneEntitlement(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static modifyEntitlements(req, res) {
        HrmBuisness.modifyEntitlements(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

    static getLeavesList(req, res) {
        HrmBuisness.getLeavesList(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getAdminLeaveList(req, res) {
        HrmBuisness.getAdminLeaveList(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getLeavesListByDate(req, res) {
        HrmBuisness.getLeavesListByDate(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static applyLeaves(req, res) {
        HrmBuisness.applyLeaves(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static applyLeavesAdmin(req, res) {
        HrmBuisness.applyLeavesAdmin(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getUserLeaveType(req, res) {
        HrmBuisness.getUserLeaveType(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getUserLeaveBalance(req, res) {
        HrmBuisness.getUserLeaveBalance(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getUserLeaveBalanceAdmin(req, res) {
        HrmBuisness.getUserLeaveBalanceAdmin(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateStatusLeaves(req, res) {
        HrmBuisness.updateStatusLeaves(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getStaffDetail(req, res) {
        HrmBuisness.getStaffDetail(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static updateAdminStatusLeaves(req, res) {
        HrmBuisness.updateAdminStatusLeaves(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }
    static getUserLeaveTypeAdmin(req, res) {
        HrmBuisness.getUserLeaveTypeAdmin(req.body)
            .then(data => res.status(200).send({ data }))
            .catch(err => res.status(404).send(err))
    }

}

module.exports = HrmController