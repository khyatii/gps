const conn = require('../config/database');
const promise = require('promise');

class HrmBuisness {

    static getAttendance(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM attendance WHERE date = '${data.date}' 
            AND user_id='${data.user.result[0].id}' AND company_id='${data.user.result[0].company_id}' ;`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }
    static getAttendanceTime(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM attendance WHERE date BETWEEN '${data.fromDate}' AND '${data.toDate}' 
            AND user_id='${data.user.result[0].id}' AND company_id='${data.user.result[0].company_id}' ;`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }
    static punchInTime(data) {
        return new promise((resolve, reject) => {
            let sql1 = `SELECT * FROM attendance WHERE date ='${data.date}' and user_id='${data.user.result[0].id}';`
            conn.query(sql1, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length > 0) {
                    return;
                }
                else {
                    let sql = `INSERT INTO attendance (date,punch_in,punch_out,user_id,company_id,remark,created_on,updated_on) VALUES
                    ('${data.date}','${data.punchInTime}','','${data.user.result[0].id}','${data.user.result[0].company_id}',
                    '','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result1) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    })
                }


            })
        })
    }
    static punchOutTime(data) {
        return new promise((resolve, reject) => {
            let sql1 = `SELECT * FROM attendance WHERE date ='${data.date}' and user_id='${data.user.result[0].id}';`
            conn.query(sql1, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length == 0) {
                    return;
                }
                else {
                    let sql = `UPDATE attendance set punch_out='${data.punchOutTime}',duration='${data.duration}',remark='${data.remarks}',
                    updated_on='${Date.now()}' where id =${result[0].id};`
                    conn.query(sql, (err, result1) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "updated" });
                    })
                }
            })
        })
    }
    static adminAttendaceRecord(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM attendance WHERE date BETWEEN '${data.fromDate}' AND '${data.toDate}' 
            AND user_id='${data.users}' AND company_id=${data.user.result[0].company_id};`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        })
    }

    static viewFiscalYear(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM fiscal_year WHERE company_id = '${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static postFiscalYear(data) {
        let activeYear;
        if (data.active === true) {
            activeYear = 1;
        } else {
            activeYear = 0;
        }
        return new promise((resolve, reject) => {
            let sql1 = `SELECT * FROM fiscal_year where session_year='${data.session_year}';`
            conn.query(sql1, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.length == 0) {
                    let sql = `INSERT INTO fiscal_year (start_date,end_date,description,session_year,isActive,company_id,user_id,created_on,updated_on) VALUES
                        ('${data.startDate}','${data.endDate}','${data.description}','${data.session_year}',
                        '${activeYear}','${data.user.result[0].company_id}','${data.user.result[0].id}',
                        '${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    })
                }
                else {
                    return reject(err);
                }
            })
        })

    }
    static deleteFiscalYear(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM fiscal_year WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getOneFiscalYear(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM fiscal_year WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateFiscalYear(data) {
        let activeYear;
        if (data.active === true) {
            activeYear = 1;
        } else {
            activeYear = 0;
        }
        return new promise((resolve, reject) => {
            let sql = `UPDATE fiscal_year SET start_date='${data.startDate}',end_date='${data.endDate}',
            description='${data.description}',session_year='${data.session_year}',isActive='${activeYear}',
            updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

    static addLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO leave_type (name,description,user_id,company_id,created_on,updated_on) VALUES
            ('${data.name}','${data.description}','${data.user.result[0].id}',
            '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "saved" });
            })
        })
    }
    static viewLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM leave_type WHERE company_id = '${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static deleteLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM leave_type WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getOneLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM leave_type WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE leave_type SET name='${data.name}',description='${data.description}',
            updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

    static addHolidays(data) {
        return new promise((resolve, reject) => {
            let repeatAnually;
            if (data.repeat === true) {
                repeatAnually = 1;
            } else {
                repeatAnually = 0;
            }
            let sql = `INSERT INTO holidays (name,date,year,description,isRepeat,user_id,company_id,created_on,updated_on) VALUES
            ('${data.name}','${data.date}','${data.year}','${data.description}','${repeatAnually}','${data.user.result[0].id}',
            '${data.user.result[0].company_id}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "saved" });
            })
        })
    }
    static viewHolidays(data) {
        let date = Date.now();
        let d = new Date(date);
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM holidays WHERE (year='${d.getFullYear()}' OR isRepeat='true')
             AND company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static deleteHolidays(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM holidays WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getOneHoliday(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM holidays WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateHolidays(data) {
        return new promise((resolve, reject) => {
            let repeatAnually;
            if (data.repeat === true) {
                repeatAnually = 1;
            } else {
                repeatAnually = 0;
            }
            let sql = `UPDATE holidays SET name='${data.name}',isRepeat=${repeatAnually},year='${data.year}',description='${data.description}',date='${data.date}',
            updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

    static getStaffDetails(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM users WHERE company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getWeekDays(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM week_days WHERE company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static addWeekDays(data) {
        let staffArray = data.staffId;
        return new promise((resolve, reject) => {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    let sql = `INSERT INTO week_days (user_name,user_id,company_id,role_id,working_days,created_on,updated_on) VALUES(
                        '${element.itemName}','${element.id}','${data.user.result[0].company_id}',
                        '${data.roles}','${data.weekDay}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    });
                }
                if (index == staffArray.length - 1) {
                    let sql = `INSERT INTO week_days (user_name,user_id,company_id,role_id,working_days,created_on,updated_on) VALUES(
                        '${element.itemName}','${element.id}','${data.user.result[0].company_id}',
                        '${data.roles}','${data.weekDay}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    });
                }
            });
        });
    }
    static deleteWeekDays(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM week_days WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getOneWeekDay(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM week_days WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static modifyWeekDays(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE week_days SET user_name='${data.user_name}',
            user_id='${data.staffId}',working_days='${data.weekDay}',role_id='${data.roles}',
            updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

    static getEntitlements(data) {

        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static addEntitlements(data) {
        let staffArray = data.staffId;
        return new promise((resolve, reject) => {
            staffArray.forEach(function (element, index) {
                if (index != staffArray.length - 1) {
                    let sql = `INSERT INTO entitlement (user_id,user_name,leaveType_id,leave_type,leave_period,leave_period_id,entitlements,company_id,role_id,created_on,updated_on) VALUES 
                        ('${element.id}','${element.itemName}','${data.leaveType}',
                        '${data.leaveIdArray.name}','${data.leavePeriodArray.session_year}','${data.leavePeriod}','${data.entitlements}',
                        '${data.user.result[0].company_id}','${data.roles}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    });
                }
                if (index == staffArray.length - 1) {
                    let sql = `INSERT INTO entitlement (user_id,user_name,leaveType_id,leave_type,leave_period,leave_period_id,entitlements,company_id,role_id,created_on,updated_on) VALUES 
                        ('${element.id}','${element.itemName}','${data.leaveType}',
                        '${data.leaveIdArray.name}','${data.leavePeriodArray.session_year}','${data.leavePeriod}','${data.entitlements}',
                        '${data.user.result[0].company_id}','${data.roles}','${Date.now()}','${Date.now()}');`
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve({ "message": "saved" });
                    });
                }
            });

        });
    }
    static deleteEntitlements(data) {
        return new promise((resolve, reject) => {
            let sql = `DELETE FROM entitlement WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getOneEntitlement(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static modifyEntitlements(data) {
        return new promise((resolve, reject) => {
            let sql = `UPDATE entitlement SET user_id='${data.staffId}',user_name='${data.staffIdArray}',role_id='${data.roles}',
            leaveType_id='${data.leaveType}',leave_type='${data.leaveIdArray}',leave_period='${data.leavePeriodArray}',
            leave_period_id='${data.leavePeriod}',entitlements='${data.entitlements}',
            updated_on='${Date.now()}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ "message": "updated" });
            });
        });
    }

    static getLeavesList(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM apply_leaves WHERE user_id='${data.user.result[0].id}' AND company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getAdminLeaveList(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM apply_leaves WHERE company_id='${data.user.result[0].company_id}' ORDER BY id DESC;`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getLeavesListByDate(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM apply_leaves WHERE to_date BETWEEN '${data.fromDate}' AND '${data.toDate}'
             AND user_id='${data.user.result[0].id}' AND company_id='${data.user.result[0].company_id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static applyLeaves(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO apply_leaves (from_date,to_date,days,user_name,user_id,company_id,
                leave_type,leave_type_id,leave_balance,leave_balance_id,status,comments,created_on,updated_on) VALUES 
            ('${data.fromDate}','${data.toDate}','${data.days}',
            '${data.user.result[0].first_name} ${data.user.result[0].last_name}','${data.user.result[0].id}',
            '${data.user.result[0].company_id}','${data.leave_type}','${data.leaveType_id}','${data.leave_balance}','${data.leave_balanceId}',
            '${data.status}','${data.comments}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    if (result.affectedRows == 1) {
                        let sql1 = `UPDATE entitlement SET entitlements='${data.leave_balance}' WHERE id='${data.leave_balanceId}';`
                        conn.query(sql1, (err, result1) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve({ "message": "saved" });
                        });
                    }
                }
            });
        });
    }
    static applyLeavesAdmin(data) {
        return new promise((resolve, reject) => {
            let sql = `INSERT INTO apply_leaves (from_date,to_date,days,user_name,user_id,company_id,
                leave_type,leave_type_id,leave_balance,leave_balance_id,status,comments,created_on,updated_on) VALUES 
            ('${data.fromDate}','${data.toDate}','${data.days}','${data.user_name}','${data.users}',
            '${data.user.result[0].company_id}','${data.leave_type}','${data.leaveType_id}','${data.leave_balance}','${data.leave_balanceId}',
            '${data.status}','${data.comments}','${Date.now()}','${Date.now()}');`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    if (result.affectedRows == 1) {
                        let sql1 = `UPDATE entitlement SET entitlements='${data.leave_balance}' WHERE id='${data.leave_balanceId}';`
                        conn.query(sql1, (err, result1) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve({ "message": "saved" });
                        });
                    }
                }
            });
        });
    }
    static getUserLeaveType(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE user_id= '${data.user.result[0].id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getUserLeaveTypeAdmin(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE user_id= '${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getUserLeaveBalance(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE user_id= '${data.user.result[0].id}' AND id='${data.leaveTypeId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static getUserLeaveBalanceAdmin(data) {
        return new promise((resolve, reject) => {
            let sql = `SELECT * FROM entitlement WHERE user_id= '${data.id}' AND id='${data.leaveTypeId}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateStatusLeaves(data) {
        return new promise((resolve, reject) => {
            let balance = data.days + data.leave_balance;
            let sql = `UPDATE apply_leaves SET status='${data.statusChange}',leave_balance='${balance}' WHERE id='${data.id}';`
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                } else {
                    if (result.affectedRows == 1) {
                        let sql = `UPDATE entitlement SET entitlements='${balance}' WHERE id='${data.leave_balance_id}';`
                        conn.query(sql, (err, result) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve({ message: "updated" });
                        });
                    }
                }
            });
        });
    }

    static getStaffDetail(data) {
        return new promise((resolve, reject) => {
            let sql;
            if (data.fromDate == undefined || data.toDate == undefined) {
                sql = `SELECT * FROM apply_leaves WHERE user_id='${data.staffId}' AND company_id='${data.user.result[0].company_id}';`
            } else {
                sql = `SELECT * FROM apply_leaves WHERE user_id=${data.staffId} AND to_date BETWEEN '${data.fromDate}' AND '${data.toDate}' AND company_id='${data.user.result[0].company_id}';`
            }
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
    static updateAdminStatusLeaves(data) {
        return new promise((resolve, reject) => {
            if (data.statusChange == 'approved') {
                let sql = `UPDATE apply_leaves SET status='${data.statusChange}' WHERE id='${data.id}';`
                conn.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve({ message: "updated" });
                    }
                });
            } else if (data.statusChange == 'reject') {
                let balance = data.days + data.leave_balance;
                let sql = `UPDATE apply_leaves SET status='${data.statusChange}',leave_balance='${balance}' WHERE id='${data.id}';`
                conn.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        if (result.affectedRows == 1) {
                            let sql = `UPDATE entitlement SET entitlements='${balance}' WHERE id='${data.leave_balance_id}';`
                            conn.query(sql, (err, result) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                resolve({ message: "updated" });
                            });
                        }
                    }
                });
            }

        });
    }


}
module.exports = HrmBuisness