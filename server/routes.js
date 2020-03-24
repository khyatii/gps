const UserController = require('./controllers/UserController')
const iwinController = require('./controllers/iwinController')
const CompanyController = require('./controllers/CompanyController')
const GoalController = require('./controllers/goalController');
const HrmController = require('./controllers/HrmController');
const OthersController = require('./controllers/OthersController');
const ModuleController = require('./controllers/ModuleController');
const PasswordAuth = require('./auth/pwdAuth');
const CheckToken = require('./auth/checkToken');
const RolesController = require('./controllers/RolesController');
const candidateRefController = require('./controllers/candidateRefController');
const candidRefDetails = require('./auth/candidRefDetails');
const skillsController = require('./controllers/skillsController');
const candidIntController = require('./controllers/candidateIntController');

module.exports = function (app) {
    app.post('/users/updateProfile', CheckToken.verify, UserController.updateProfile);
    app.get('/users/getData/:id', UserController.getUserData);
    app.get('/users/getSelectedUserContactDetails/:id', UserController.getSelectedUserContactDetails);
    app.get('/users/getContactDetails', CheckToken.verify, UserController.getContactDetails);
    app.post('/users/getMultipleUserData', UserController.getMultipleUserData);
    app.get('/getCompanyUsers', CheckToken.verify, UserController.getCompanyUsers);
    app.get('/users/getJobDetail', CheckToken.verify, UserController.getJobDetail);
    app.get('/users/getSelectedUserJobDetail/:id', UserController.getSelectedUserJobDetail);
    app.post('/users/getGoals', CheckToken.verify, UserController.getGoals);
    app.post('/users/updateUserData', CheckToken.verify, UserController.updateUserData);
    app.post('/users/postContactDetail', CheckToken.verify, UserController.postContactDetail);
    app.post('/users/postJobDetail', CheckToken.verify, UserController.postJobDetail);

    app.post('/users/login', PasswordAuth.checkPassword, UserController.login);
    app.post('/users/signup', PasswordAuth.passwordHash, UserController.userSignup);
    app.get('/users/getAllRoles', CheckToken.verify, UserController.getRoles);
    app.get('/users/getLoginUser', CheckToken.verify, UserController.getLoginUser);
    app.post('/users/getAllUsers', CheckToken.verify, UserController.getUsers);
    app.post('/users/deleteUser', CheckToken.verify, UserController.deleteUser);

    app.get('/location', UserController.listCountry);
    app.get('/location/:id', UserController.listState);
    app.get('/location/cities/:id', UserController.listCities);

    app.get('/users/getProfileImage', CheckToken.verify, UserController.getProfileImage);
    app.get('/users/getSelectedUserProfileImage/:id', UserController.getSelectedUserProfileImage);
    app.post('/company/signup', PasswordAuth.passwordHash, CompanyController.companySignup)
    app.post('/goal', CheckToken.verify, GoalController.inputGoal)
    app.post('/getSingleGoal', CheckToken.verify, GoalController.getOneGoal)
    app.post('/updateAccuracy', CheckToken.verify, GoalController.updateAccuracy)
    app.post('/getMonthlyGoals', CheckToken.verify, GoalController.getMonthlyGoals)
    app.post('/getCustomGoals', CheckToken.verify, GoalController.getCustomGoals)
    app.post('/getUserRoles', CheckToken.verify, GoalController.getUserRoles)

    app.get('/module', ModuleController.getModules);
    app.post('/pages', ModuleController.getPages);
    app.post('/allpages', ModuleController.getAllPages);

    app.post('/iwin/save', CheckToken.verify, iwinController.inputIwin);
    app.get('/iwin/show', CheckToken.verify, iwinController.showIwinData);
    app.post('/iwin/getOneIwin', iwinController.getOneIwin);
    app.post('/iwin/updateIwin', CheckToken.verify, iwinController.updateIwin);
    app.post('/iwin/deleteIwin', iwinController.deleteIwin);
    app.get('/iwin/getIwinRequests', CheckToken.verify, iwinController.getIwinRequests);
    app.post('/iwin/updateIwinStatus', iwinController.updateIwinStatus);

    app.post('/access/save', CheckToken.verify, ModuleController.savePageAccess);
    app.post('/access/saveModules', CheckToken.verify, ModuleController.saveModulesAccess);
    app.post('/access/getRoleModule', CheckToken.verify, ModuleController.getModule);
    app.post('/access/getRoleAccessedModules', CheckToken.verify, ModuleController.getRoleAccessedModules);
    app.post('/getUserPages', CheckToken.verify, ModuleController.getUserPages);

    app.post('/getAttendance', CheckToken.verify, HrmController.getAttendance);
    app.post('/getAttendanceTime', CheckToken.verify, HrmController.getAttendanceTime);
    app.post('/postPunchInTime', CheckToken.verify, HrmController.postPunchInTime);
    app.post('/postPunchOutTime', CheckToken.verify, HrmController.postPunchOutTime);
    app.post('/adminAttendaceRecord', CheckToken.verify, HrmController.adminAttendaceRecord);

    app.post('/fiscalYear', CheckToken.verify, HrmController.fiscalYear);
    app.get('/viewFiscalYear', CheckToken.verify, HrmController.viewFiscalYear);
    app.post('/deleteFiscalYear', HrmController.deleteFiscalYear);
    app.post('/getOneFiscalYear', HrmController.getOneFiscalYear);
    app.post('/updateFiscalYear', CheckToken.verify, HrmController.updateFiscalYear);

    app.post('/addLeaveType', CheckToken.verify, HrmController.addLeaveType);
    app.get('/viewLeaveType', CheckToken.verify, HrmController.viewLeaveType);
    app.post('/deleteLeaveType', HrmController.deleteLeaveType);
    app.post('/getOneLeaveType', HrmController.getOneLeaveType);
    app.post('/updateLeaveType', CheckToken.verify, HrmController.updateLeaveType);

    app.post('/addHolidays', CheckToken.verify, HrmController.addHolidays);
    app.get('/viewHolidays', CheckToken.verify, HrmController.viewHolidays);
    app.post('/deleteHolidays', HrmController.deleteHolidays);
    app.post('/getOneHoliday', HrmController.getOneHoliday);
    app.post('/updateHolidays', CheckToken.verify, HrmController.updateHolidays);

    app.get('/getStaffDetails', CheckToken.verify, HrmController.getStaffDetails);
    app.get('/getWeekDays', CheckToken.verify, HrmController.getWeekDays);
    app.post('/addWeekDays', CheckToken.verify, HrmController.addWeekDays);
    app.post('/deleteWeekDays', HrmController.deleteWeekDays);
    app.post('/getOneWeekDay', HrmController.getOneWeekDay);
    app.post('/modifyWeekDays', CheckToken.verify, HrmController.modifyWeekDays);

    app.get('/getEntitlements', CheckToken.verify, HrmController.getEntitlements);
    app.post('/addEntitlements', CheckToken.verify, HrmController.addEntitlements);
    app.post('/deleteEntitlements', HrmController.deleteEntitlements);
    app.post('/getOneEntitlement', HrmController.getOneEntitlement);
    app.post('/modifyEntitlements', CheckToken.verify, HrmController.modifyEntitlements);

    app.get('/getLeavesList', CheckToken.verify, HrmController.getLeavesList);
    app.get('/getAdminLeaveList', CheckToken.verify, HrmController.getAdminLeaveList);
    app.post('/getLeavesListByDate', CheckToken.verify, HrmController.getLeavesListByDate);
    app.post('/applyLeaves', CheckToken.verify, HrmController.applyLeaves);
    app.get('/getUserLeaveType', CheckToken.verify, HrmController.getUserLeaveType);
    app.post('/getUserLeaveBalance', CheckToken.verify, HrmController.getUserLeaveBalance);
    app.post('/updateStatusLeaves', HrmController.updateStatusLeaves);
    app.post('/getStaffDetail', CheckToken.verify, HrmController.getStaffDetail);
    app.post('/updateAdminStatusLeaves', CheckToken.verify, HrmController.updateAdminStatusLeaves);
    app.post('/getUserLeaveTypeAdmin', HrmController.getUserLeaveTypeAdmin);
    app.post('/getUserLeaveBalanceAdmin', HrmController.getUserLeaveBalanceAdmin);
    app.post('/applyLeavesAdmin', CheckToken.verify, HrmController.applyLeavesAdmin);

    app.post('/saveMeetings', CheckToken.verify, OthersController.saveMeetings);
    app.get('/viewMeetings', CheckToken.verify, OthersController.viewMeetings);
    app.post('/deleteMeetings', OthersController.deleteMeetings);
    app.post('/getOneMeeting', OthersController.getOneMeeting);
    app.post('/updateMeetings', CheckToken.verify, OthersController.updateMeetings);
    app.post('/updateMeetingStatus', CheckToken.verify, OthersController.updateMeetingStatus);

    app.post('/role/save', CheckToken.verify, RolesController.save);
    app.post('/role/update', CheckToken.verify, RolesController.update);
    app.get('/role/getRoleInfo/:id', CheckToken.verify, RolesController.getRoleInfo);
    app.get('/role/getAllRoles', CheckToken.verify, RolesController.getAllRoles);

    app.post('/emailBroadcast', CheckToken.verify, OthersController.emailBroadcast);
    app.post('/smsBroadcast', CheckToken.verify, OthersController.smsBroadcast);
    app.get('/getBroadcast', CheckToken.verify, OthersController.getBroadcast);
    app.post('/getOneBroadcast', OthersController.getOneBroadcast);

    app.post('/userInvitation', CheckToken.verify, UserController.userInvitation);
    app.post('/saveInvitedUser', UserController.saveInvitedUser);
    app.post('/getInvitationLinkDetails', UserController.getInvitationLinkDetails);

    app.get('/getBroadcast', CheckToken.verify, OthersController.getBroadcast);
    app.post('/getOneBroadcast', OthersController.getOneBroadcast);

    app.post('/candidateRef/basicInfo', candidRefDetails.getUserDetails, candidateRefController.basicInfo);
    app.post('/candidateRef/qualification', candidRefDetails.getUserDetails, candidateRefController.qualification);
    app.post('/candidateRef/skills', candidRefDetails.getUserDetails, candidateRefController.skills);
    app.post('/candidateRef/experience', candidRefDetails.getUserDetails, candidateRefController.workExp);
    app.post('/candidateRef/social', candidRefDetails.getUserDetails, candidateRefController.social);
    app.post('/candidateInvitation', CheckToken.verify, candidateRefController.candidateInvitation);
    app.post('/candidateRef/decrypt', candidRefDetails.getUserDetails, candidateRefController.decryptUser);
    app.get('/candidateRef/getReference', CheckToken.verify, candidateRefController.getReference);
    app.post('/candidateRef/declineRef', CheckToken.verify, candidateRefController.declineCandidRef)
    app.post('/candidateRef/holdRef', CheckToken.verify, candidateRefController.holdCandidRef)
    app.post('/candidateRef/refInfo', CheckToken.verify, candidateRefController.referenceInfo)
    app.post('/candidateRef/scheduleInterview', CheckToken.verify, candidateRefController.scheduleInterview)
    app.get('/candidateRef/getInterviewDetails', CheckToken.verify, candidateRefController.staffInterviews);

    app.post('/candidateInt/rejectInterview', CheckToken.verify, candidIntController.rejectInterview);
    app.post('/candidateInt/saveInterviewRatings', CheckToken.verify, candidIntController.saveInterviewRatings);
    app.get('/candidateInt/getHoldCandidates', CheckToken.verify, candidIntController.getHoldRef);
    app.get('/candidateInt/getRejectCandidates', CheckToken.verify, candidIntController.getDeclineRef);
    app.get('/candidateInt/getCompletedCandidates', CheckToken.verify, candidIntController.getCompletedRef);
    app.post('/candidateInt/getCandidRatings', CheckToken.verify, candidIntController.getCandidRatings);
    app.get('/candidateInt/getAllRef', CheckToken.verify, candidIntController.getAllRef);

    app.get('/candidateInt/getAllJobs', CheckToken.verify, candidIntController.getAllJobs);
    app.post('/candidateInt/jobchangeStatus', CheckToken.verify, candidIntController.jobchangeStatus);



    app.post('/candidateInt/postJobs', CheckToken.verify, candidIntController.postJobs);
    app.get('/candidateInt/viewJobs', CheckToken.verify, candidIntController.seeJobs);

    // app.post('/sendInvitation', CheckToken.verify, UserController.sendInvitation);
    app.post('/forgotPassword', UserController.forgotPassword);
    app.post('/setPassword', UserController.setPassword);
    app.post('/checkTokenExpire', UserController.checkTokenExpire);


    app.get('/viewQuestionnaire', CheckToken.verify, OthersController.viewQuestionnaire);
    app.post('/postQuestion', CheckToken.verify, OthersController.postQuestion);
    app.post('/deleteQuestionnaire', OthersController.deleteQuestionnaire);
    app.post('/getOneQuestion', OthersController.getOneQuestion);
    app.post('/updateQuestion', OthersController.updateQuestion);
    app.post('/updateLikes', CheckToken.verify, OthersController.updateLikes);
    app.post('/updateDisLikes', CheckToken.verify, OthersController.updateDisLikes);
    app.post('/viewLikesStatus', CheckToken.verify, OthersController.viewLikesStatus);
    app.post('/postComments', CheckToken.verify, OthersController.postComments);
    app.get('/viewComments', CheckToken.verify, OthersController.viewComments);
    app.post('/viewOneQuestionnaire', OthersController.viewOneQuestionnaire);
    app.post('/likesCount', OthersController.likesCount);
    app.get('/countComments', OthersController.countComments);
    app.get('/countLikesStatus', OthersController.countLikesStatus);

    app.get('/getSkills', skillsController.getSkills)
}   