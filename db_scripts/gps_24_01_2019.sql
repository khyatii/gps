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

-- Dumping structure for table gps.apply_leaves
CREATE TABLE IF NOT EXISTS `apply_leaves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_date` varchar(45) DEFAULT NULL,
  `to_date` varchar(45) DEFAULT NULL,
  `days` int(11) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `leave_type` varchar(45) DEFAULT NULL,
  `leave_type_id` int(11) NOT NULL,
  `leave_balance` varchar(45) DEFAULT NULL,
  `leave_balance_id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `comments` varchar(60) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_apply_leaves_1_idx` (`user_id`),
  KEY `fk_apply_leaves_2_idx` (`leave_type_id`),
  KEY `fk_apply_leaves_3_idx` (`leave_balance_id`),
  KEY `fk_apply_leaves_4_idx` (`company_id`),
  CONSTRAINT `fk_apply_leaves_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_apply_leaves_2` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_apply_leaves_3` FOREIGN KEY (`leave_balance_id`) REFERENCES `entitlement` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_apply_leaves_4` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.attendance
CREATE TABLE IF NOT EXISTS `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) DEFAULT NULL,
  `punch_in` varchar(45) DEFAULT NULL,
  `punch_out` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_attendance_1_idx` (`company_id`),
  KEY `fk_attendance_2_idx` (`user_id`),
  CONSTRAINT `fk_attendance_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_attendance_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.broadcast
CREATE TABLE IF NOT EXISTS `broadcast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_mobile` varchar(45) DEFAULT NULL,
  `type` varchar(5) DEFAULT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `description` text,
  `company_id` int(11) NOT NULL,
  `company_email` varchar(50) DEFAULT NULL,
  `from_user_id` int(11) NOT NULL,
  `from_username` varchar(45) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_broadcast_1_idx` (`company_id`),
  KEY `fk_broadcast_2_idx` (`user_id`),
  KEY `fk_broadcast_3_idx` (`role_id`),
  KEY `fk_broadcast_4_idx` (`from_user_id`),
  CONSTRAINT `fk_broadcast_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_broadcast_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_broadcast_3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_broadcast_4` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candidateRef_basicInfo
CREATE TABLE IF NOT EXISTS `candidateRef_basicInfo` (
  `id` int(10) NOT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(10) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `phone` int(10) DEFAULT NULL,
  `dob` date NOT NULL,
  `parent_id` varchar(8) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candidate_Interview
CREATE TABLE IF NOT EXISTS `candidate_Interview` (
  `id` int(10) NOT NULL,
  `ref_id` int(10) DEFAULT NULL,
  `interviewer_id` int(10) DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `interview_time` varchar(30) DEFAULT NULL,
  `interview_venue` varchar(200) DEFAULT NULL,
  `interview_mode` varchar(50) DEFAULT NULL,
  `interview_note` text NOT NULL,
  `interview_status` varchar(4) DEFAULT NULL,
  `company_id` int(10) NOT NULL,
  `created_on` varchar(100) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `updated_on` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candid_exp
CREATE TABLE IF NOT EXISTS `candid_exp` (
  `id` int(10) NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `from_date` varchar(200) DEFAULT NULL,
  `to_date` varchar(200) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `created_on` int(50) NOT NULL,
  `updated_on` int(50) NOT NULL,
  `parent_id` int(10) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candid_qualification
CREATE TABLE IF NOT EXISTS `candid_qualification` (
  `id` int(10) NOT NULL,
  `ClassX_Board` varchar(30) DEFAULT NULL,
  `ClassX_Percentage` varchar(10) NOT NULL,
  `ClassX_YrOfPassing` varchar(30) NOT NULL,
  `ClassXII_Board` varchar(30) NOT NULL,
  `ClassXII_Percentage` varchar(20) DEFAULT NULL,
  `ClassXII_YrOfPassing` varchar(30) NOT NULL,
  `Graduation_Board` varchar(30) DEFAULT NULL,
  `Graduation_Percentage` varchar(20) DEFAULT NULL,
  `Graduation_YrOfPassing` varchar(30) NOT NULL,
  `Masters_Board` varchar(30) DEFAULT NULL,
  `Masters_Percentage` varchar(20) DEFAULT NULL,
  `Masters_YrOfPassing` varchar(30) NOT NULL,
  `company_id` int(10) NOT NULL,
  `created_on` varchar(30) NOT NULL,
  `updated_on` varchar(30) NOT NULL,
  `parent_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candid_ref
CREATE TABLE IF NOT EXISTS `candid_ref` (
  `id` int(10) NOT NULL,
  `invitaion_id` int(30) DEFAULT NULL,
  `company_id` int(10) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(50) NOT NULL,
  `user_email` varchar(80) DEFAULT NULL,
  `submit_status` tinyint(1) DEFAULT NULL,
  `created_on` varchar(45) NOT NULL,
  `updated_on` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candid_skills
CREATE TABLE IF NOT EXISTS `candid_skills` (
  `id` int(10) NOT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `company_id` varchar(10) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  `parent_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.candid_social
CREATE TABLE IF NOT EXISTS `candid_social` (
  `github` text,
  `linkedin` text,
  `facebook` text,
  `twitter` text,
  `id` int(10) NOT NULL,
  `parent_id` int(10) NOT NULL,
  `created_on` int(11) NOT NULL,
  `updated_on` int(11) NOT NULL,
  `resume` text NOT NULL,
  `company_id` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.company_plan
CREATE TABLE IF NOT EXISTS `company_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `plan_start_date` date NOT NULL,
  `plan_end_date` date NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__company_profile` (`company_id`),
  KEY `FK__plans` (`plan_id`),
  CONSTRAINT `FK__company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`),
  CONSTRAINT `FK__plans` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.company_profile
CREATE TABLE IF NOT EXISTS `company_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `authorised_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `country` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `address` varchar(250) NOT NULL,
  `mobile_no` varchar(50) NOT NULL,
  `work_no` varchar(50) NOT NULL,
  `office_no` varchar(50) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `updated_on` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_company_profile_locations` (`country`),
  KEY `FK_company_profile_locations_2` (`state`),
  KEY `FK_company_profile_locations_3` (`city`),
  CONSTRAINT `FK_company_profile_locations` FOREIGN KEY (`country`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `FK_company_profile_locations_2` FOREIGN KEY (`state`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `FK_company_profile_locations_3` FOREIGN KEY (`city`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.entitlement
CREATE TABLE IF NOT EXISTS `entitlement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `leaveType_id` int(11) NOT NULL,
  `leave_type` varchar(45) DEFAULT NULL,
  `leave_period` varchar(45) DEFAULT NULL,
  `leave_period_id` int(11) NOT NULL,
  `entitlements` varchar(45) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_new_table_1_idx` (`company_id`),
  KEY `fk_new_table_2_idx` (`user_id`),
  KEY `fk_new_table_3_idx` (`leaveType_id`),
  KEY `fk_new_table_4_idx` (`leave_period_id`),
  CONSTRAINT `fk_new_table_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_new_table_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_new_table_3` FOREIGN KEY (`leaveType_id`) REFERENCES `leave_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_new_table_4` FOREIGN KEY (`leave_period_id`) REFERENCES `fiscal_year` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.fiscal_year
CREATE TABLE IF NOT EXISTS `fiscal_year` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` varchar(45) DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `session_year` varchar(45) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_fiscal_year_1_idx` (`company_id`),
  KEY `fk_fiscal_year_2_idx` (`user_id`),
  CONSTRAINT `fk_fiscal_year_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_fiscal_year_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.goal
CREATE TABLE IF NOT EXISTS `goal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goal_name` varchar(50) DEFAULT NULL,
  `goal_description` longtext,
  `expected_time` int(11) DEFAULT NULL,
  `actual_time` int(11) DEFAULT '-1',
  `user_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `currentTime` varchar(50) DEFAULT NULL,
  `accuracy` varchar(45) DEFAULT NULL,
  `isCompleted` varchar(45) DEFAULT 'false',
  PRIMARY KEY (`id`),
  KEY `FK_goal_users` (`user_id`),
  KEY `FK_goal_company_profile` (`company_id`),
  CONSTRAINT `FK_goal_company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`),
  CONSTRAINT `FK_goal_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.holidays
CREATE TABLE IF NOT EXISTS `holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `isRepeat` tinyint(1) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_holidays_1_idx` (`company_id`),
  KEY `fk_holidays_2_idx` (`user_id`),
  CONSTRAINT `fk_holidays_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_holidays_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.interview_ratings
CREATE TABLE IF NOT EXISTS `interview_ratings` (
  `id` int(10) NOT NULL,
  `skill` varchar(200) DEFAULT NULL,
  `remarks` text,
  `rating` int(10) DEFAULT NULL,
  `interview_id` int(10) DEFAULT NULL,
  `company_id` int(10) DEFAULT NULL,
  `reference_id` int(10) DEFAULT NULL,
  `created_on` varchar(200) DEFAULT NULL,
  `updated_on` int(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.invitation_links
CREATE TABLE IF NOT EXISTS `invitation_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invitation_name` varchar(50) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `sender_email` varchar(50) NOT NULL,
  `recipient_email` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `active` enum('A','I') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.iwin
CREATE TABLE IF NOT EXISTS `iwin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `date` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_iwin_1_idx` (`company_id`),
  KEY `fk_iwin_2_idx` (`user_id`),
  KEY `fk_iwin_3_idx` (`role_id`),
  KEY `fk_iwin_4_idx` (`author_id`),
  CONSTRAINT `fk_iwin_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_iwin_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_iwin_3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_iwin_4` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.job_detail
CREATE TABLE IF NOT EXISTS `job_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `department` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `employment_status` varchar(45) DEFAULT NULL,
  `joining_date` varchar(25) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `salary` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_detail_1_idx` (`company_id`),
  KEY `fk_job_detail_2_idx` (`user_id`),
  CONSTRAINT `fk_job_detail_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_job_detail_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.leave_type
CREATE TABLE IF NOT EXISTS `leave_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_leave_type_1_idx` (`company_id`),
  KEY `fk_leave_type_2_idx` (`user_id`),
  CONSTRAINT `fk_leave_type_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_leave_type_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.locations
CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `location_type` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `is_visible` int(11) NOT NULL,
  `country_code` int(11) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `locations` (`location_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52473 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.meetings
CREATE TABLE IF NOT EXISTS `meetings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `host` varchar(45) DEFAULT NULL,
  `host_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` text,
  `date_time` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `note` varchar(100) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_meetings_1_idx` (`host_id`),
  KEY `fk_meetings_2_idx` (`company_id`),
  KEY `fk_meetings_3_idx` (`role_id`),
  KEY `fk_meetings_4_idx` (`user_id`),
  CONSTRAINT `fk_meetings_1` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_meetings_2` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_meetings_3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.module
CREATE TABLE IF NOT EXISTS `module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `icon_class` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.module_role
CREATE TABLE IF NOT EXISTS `module_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11),
  `module_id` int(11),
  `sort_order` int(50) DEFAULT NULL,
  `is_permission` enum('R','W','N') NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_module_role_role` (`role_id`),
  KEY `FK_module_role_module` (`module_id`),
  KEY `FK_module_role_company_profile` (`company_id`),
  CONSTRAINT `FK_module_role_company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`),
  CONSTRAINT `FK_module_role_module` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `FK_module_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.pages
CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `icon_class` varchar(50) DEFAULT NULL,
  `module_id` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('A','I') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  KEY `FK_pages_module` (`module_id`),
  CONSTRAINT `FK_pages_module` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.pages_role
CREATE TABLE IF NOT EXISTS `pages_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `page_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `module_role_id` int(11) NOT NULL,
  `is_permission` enum('R','W','N') NOT NULL,
  `company_id` int(11) NOT NULL,
  `sort_order` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `status` enum('A','I') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id`),
  KEY `FK_pages_role_pages` (`page_id`),
  KEY `FK_pages_role_role` (`user_role_id`),
  KEY `FK_pages_role_module_role` (`module_role_id`),
  KEY `FK_pages_role_company_profile` (`company_id`),
  CONSTRAINT `FK_pages_role_company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`),
  CONSTRAINT `FK_pages_role_module_role` FOREIGN KEY (`module_role_id`) REFERENCES `module_role` (`id`),
  CONSTRAINT `FK_pages_role_pages` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`),
  CONSTRAINT `FK_pages_role_role` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.plans
CREATE TABLE IF NOT EXISTS `plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `price` int(50) NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.
-- Dumping structure for table gps.questionnaire
CREATE TABLE IF NOT EXISTS `questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text,
  `question_userid` int(11) DEFAULT NULL,
  `question_username` varchar(50) DEFAULT NULL,
  `question_date` varchar(45) DEFAULT NULL,
  `ques_userEmail` varchar(45) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `user_image` varchar(99) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questionnaire_1_idx` (`question_userid`),
  KEY `fk_questionnaire_3_idx` (`company_id`),
  CONSTRAINT `fk_questionnaire_1` FOREIGN KEY (`question_userid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_questionnaire_3` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.questionnaire_comments
CREATE TABLE IF NOT EXISTS `questionnaire_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionnaire_id` int(11) DEFAULT NULL,
  `comments` text,
  `comment_userid` int(11) DEFAULT NULL,
  `comment_username` varchar(50) DEFAULT NULL,
  `comment_date` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `user_image` varchar(45) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questionnaire_comments_1_idx` (`questionnaire_id`),
  KEY `fk_questionnaire_comments_2_idx` (`comment_userid`),
  KEY `fk_questionnaire_comments_3_idx` (`company_id`),
  CONSTRAINT `fk_questionnaire_comments_1` FOREIGN KEY (`questionnaire_id`) REFERENCES `questionnaire` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_questionnaire_comments_2` FOREIGN KEY (`comment_userid`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_questionnaire_comments_3` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.questionnaire_likes
CREATE TABLE IF NOT EXISTS `questionnaire_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `likes_status` tinyint(1) NOT NULL DEFAULT '0',
  `dislikes_status` tinyint(1) NOT NULL DEFAULT '0',
  `like_counts` varchar(45) DEFAULT NULL,
  `dislike_counts` varchar(45) DEFAULT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_questionnaire_likes_1_idx` (`user_id`),
  KEY `fk_questionnaire_likes_2_idx` (`question_id`),
  KEY `fk_questionnaire_likes_3_idx` (`company_id`),
  CONSTRAINT `fk_questionnaire_likes_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_questionnaire_likes_2` FOREIGN KEY (`question_id`) REFERENCES `questionnaire` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_questionnaire_likes_3` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `des` text NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `created_on` int(20) NOT NULL,
  `updated_on` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_role_company_profile` (`company_id`),
  CONSTRAINT `FK_role_company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `company_id` int(11) NOT NULL,
  `country` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `address` varchar(250) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `updated_on` varchar(50) NOT NULL,
  `user_type` enum('S','A','U') NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `blood_group` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `status` enum('A','I') DEFAULT 'A',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `FK_users_locations` (`country`),
  KEY `FK_users_locations_2` (`state`),
  KEY `FK_users_locations_3` (`city`),
  CONSTRAINT `FK_users_locations` FOREIGN KEY (`country`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `FK_users_locations_2` FOREIGN KEY (`state`) REFERENCES `locations` (`location_id`),
  CONSTRAINT `FK_users_locations_3` FOREIGN KEY (`city`) REFERENCES `locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_on` varchar(50) NOT NULL,
  `updated_on` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_role_users` (`user_id`),
  KEY `FK_user_role_role` (`role_id`),
  KEY `FK_user_role_company_profile` (`company_id`),
  CONSTRAINT `FK_user_role_company_profile` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`),
  CONSTRAINT `FK_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK_user_role_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.user_type
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table gps.week_days
CREATE TABLE IF NOT EXISTS `week_days` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `working_days` varchar(100) DEFAULT NULL,
  `created_on` varchar(45) DEFAULT NULL,
  `updated_on` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_week_days_1_idx` (`company_id`),
  KEY `fk_week_days_2_idx` (`user_id`),
  CONSTRAINT `fk_week_days_1` FOREIGN KEY (`company_id`) REFERENCES `company_profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_week_days_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
