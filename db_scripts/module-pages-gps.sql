-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.24-0ubuntu0.16.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table gps.module: ~6 rows (approximately)
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` (`id`, `name`, `icon_class`) VALUES
	(3, 'Dashboard', 'fa-tachometer'),
	(4, 'Set Up', 'fa-cogs'),
	(5, 'Goals', 'fa-google'),
	(6, 'HRM', 'fa-map '),
	(7, 'Accounts', 'fa-users '),
	(8, 'Others', 'fa-briefcase');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;

-- Dumping data for table gps.pages: ~23 rows (approximately)
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` (`id`, `name`, `url`, `icon_class`, `module_id`, `sort_order`, `created_at`, `updated_at`, `status`) VALUES
	(6, 'Dashboard', '/pages/dashboard', 'fa-tachometer', 3, 0, '2018-11-23 12:22:39', '2018-11-23 12:22:41', 'A'),
	(7, 'User Registration', '/pages/signup-user', 'fa-user ', 4, 0, '2018-11-23 12:23:47', '2018-11-23 12:23:47', 'A'),
	(8, 'Access Management', '/pages/access-management', 'fa-lock', 4, 0, '2018-11-23 12:24:21', '2018-11-23 12:24:21', 'A'),
	(9, 'IWIN', '/pages/iwin', 'fa-neuter', 4, 0, '2018-11-23 12:25:10', '2018-11-23 12:25:10', 'A'),
	(10, 'Goals', '/pages/dashboard2', 'fa-google ', 5, 0, '2018-11-23 12:25:40', '2018-11-23 12:25:40', 'A'),
	(11, 'View Goals', '/pages/view-goals', 'fa-eye', 5, 0, '2018-11-23 12:26:22', '2018-11-23 12:26:22', 'A'),
	(12, 'Profile', '/pages/update-profile/user/profileDetail', 'fa-user ', 4, 0, '2018-11-23 12:26:52', '2018-11-23 12:26:52', 'A'),
	(13, 'Attendance', '/pages/hrm/attendance', 'fa-user-o', 6, 0, '2018-11-29 15:52:25', '2018-11-29 15:52:25', 'A'),
	(14, 'Fiscal Year', '/pages/hrm/view-fiscal-year', 'fa-user ', 6, 0, '2018-11-29 15:52:25', '2018-11-29 15:52:25', 'A'),
	(15, 'Leave Type', '/pages/hrm/leave-type', 'fa-user ', 6, 0, '2018-11-29 15:52:25', '2018-11-29 15:52:25', 'A'),
	(16, 'Holidays', '/pages/hrm/holidays', 'fa-suitcase', 6, 0, '2018-11-30 13:52:25', '2018-11-30 13:52:25', 'A'),
	(17, 'Week Days', '/pages/hrm/week-days', 'fa-calendar', 6, 0, '2018-12-03 13:52:25', '2018-12-03 13:52:25', 'A'),
	(18, 'Entitlements', '/pages/hrm/entitlement', 'fa-play-circle', 6, 0, '2018-12-04 13:52:25', '2018-12-04 13:52:25', 'A'),
	(19, 'Leaves List', '/pages/hrm/leaves-list', 'fa-sign-out', 6, 0, '2018-12-04 15:52:25', '2018-12-04 15:52:25', 'A'),
	(20, 'Admin Leaves List', '/pages/hrm/adminLeaveList', 'fa-sign-out', 6, 0, '2018-12-05 15:52:25', '2018-12-05 15:52:25', 'A'),
	(22, 'Attendance Record', '/pages/hrm/viewAttendanceRecord', 'fa-address-book', 6, 0, '2018-12-06 15:52:25', '2018-12-06 15:52:25', 'A'),
	(23, 'Assign Leaves', '/pages/hrm/assign-leaves', 'fa-user-o', 6, 0, '2018-12-07 11:17:33', '2018-12-07 11:17:33', 'A'),
	(24, 'View Attendance Record', '/pages/hrm/viewAdminAttendance', 'fa-address-book', 6, 0, '2018-12-07 15:54:23', '2018-12-07 15:54:23', 'A'),
	(25, 'Meetings', '/pages/others/meetings', 'fa-users', 8, 0, '2018-12-14 12:37:23', '2018-12-14 12:37:23', 'A'),
	(26, 'Admin Meetings List', '/pages/others/admin-meetings', 'fa-users', 8, 0, '2018-12-19 12:37:23', '2018-12-19 12:37:23', 'A'),
	(27, 'IWIN Requests', '/pages/iwin/iwin-requests', 'fa-users', 4, 0, '2018-12-20 12:37:23', '2018-12-20 12:37:23', 'A'),
	(28, 'Roles', '/pages/roles', 'fa-user-o', 4, 0, '2018-12-27 13:41:04', '2018-12-27 13:41:06', 'A'),
	(29, 'Invite User', '/pages/signup-user/send-invitation', 'fa-user', 4, 0, '2018-12-28 11:35:40', '2018-12-28 11:35:41', 'A'),
	(30, 'Invite Candidate', '/pages/invite-candidiate', 'fa-user', 4, 0, '2019-01-04 13:54:40', '2019-01-04 13:54:41', 'A'),
	(31, 'Questionnaire', '/pages/others/questionnaire', 'fa-question-circle', 8, 0, '2019-01-03 13:30:40', '2019-01-03 13:30:40', 'A'),
	(32, 'Reference', '/pages/candidate-reference', 'fa-users', 8, 0, '2018-12-20 05:13:41', '2018-12-20 05:13:41', 'A'),
	(33, 'View Reference', '/pages/view-reference', ' fa-angellist', 8, 0, '2019-01-08 05:52:33', '2019-01-08 05:52:33', 'A'),
	(34, 'Interview', '/pages/interview', 'far fa-user', 8, 0, '2019-01-15 06:32:12', '2019-01-15 06:32:12', 'A'),
	(35, 'add-job', '/pages/add-job', 'fa fa-plus-square', 8, 0, '2019-01-21 11:18:37', '2019-01-21 11:18:37', 'A'),
	(36, 'view-jobs', '/pages/view-jobs', 'fa fa-eye', 8, 0, '2019-01-21 11:18:37', '2019-01-21 11:18:37', 'A');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
