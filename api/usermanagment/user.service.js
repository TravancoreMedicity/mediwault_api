const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertUser: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO user(
                name,
                mobile,
                email,
                login_type,
                password,
                password_validity,
                password_validity_expiry_date,
                user_status,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                created_user,
                last_passwd_change_date,
                printer_access,
                custodian_status,
                notification_status,
                temp_user_status,
                temp_user_days,
                cust_slno,
                created_ip, created_browser_name, created_browser_version, created_os_name, created_os_version

                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [

                data.name,
                data.mobile,
                data.email,
                data.login_type,
                data.password,
                data.password_validity,
                data.password_validity_expiry_date,
                data.user_status,
                data.sign_in_per_day_limit,
                data.sign_in_per_day_count,
                data.is_limited_user,
                data.login_method_allowed,
                data.created_by,
                data.lastPasswordChangeDate,
                data.printer_access,
                data.custodian_status,
                data.notification_status,
                data.temp_user_status,
                data.temp_user_days,
                data.cust_slno,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion


            ],
            (error, results, fields) => {
                logger.error(error)
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },


    editUser: (data, callBack) => {
        mysqlpool.query(
            `UPDATE user 
            SET 
                name = ?,
                mobile = ?,
                email = ?,
                login_type = ?,
                password_validity = ?,
                user_status = ?,
                sign_in_per_day_limit = ?,
                sign_in_per_day_count = ?,
                is_limited_user = ?,
                login_method_allowed = ?,
            
                printer_access = ?,
                custodian_status = ?,   
                notification_status = ?,
                temp_user_status=?,
                temp_user_days=?,
                cust_slno=?,
                updated_user = ?,
                updated_time = ?,
                edited_ip= ?,
                 edited_browser_name= ?,
                 edited_browser_version= ?,
                 edited_os_name= ?,
                  edited_os_version= ?
            WHERE 
                user_slno = ?`,

            //                password_validity_expiry_date = ?,

            //  created_user = ?,
            //     last_passwd_change_date = ?,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_type,
                data.password_validity,
                // data.password_validity_expiry_date,
                data.user_status,
                data.sign_in_per_day_limit,
                data.sign_in_per_day_count,
                data.is_limited_user,
                data.login_method_allowed,
                // data.created_by,
                // data.lastPasswordChangeDate,
                data.printer_access,
                data.custodian_status,
                data.notification_status,
                data.temp_user_status,
                data.temp_user_days,
                data.cust_slno,
                data.edit_user,
                data.edit_date,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    // console.log("error:", error);

                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



    deleteUser: (id, callBack) => {
        mysqlpool.query(
            `UPDATE user SET user_status = 0 WHERE user_slno = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getUser: (id, callBack) => {
        mysqlpool.query(
            'SELECT * FROM user WHERE user_slno = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getAllUser: (callBack) => {
        mysqlpool.query(
            'SELECT * FROM user',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    mobileExist: (mobile, callBack) => {

        mysqlpool.query(
            'SELECT * FROM user WHERE mobile = ?',
            [
                mobile
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    emailExist: (email, callBack) => {
        mysqlpool.query(
            'SELECT * FROM user WHERE email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertOTP: (data, callBack) => {
        mysqlpool.query(
            `UPDATE user SET generatedotp = ? WHERE mobile = ? `,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    verifyOTP: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                iv,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access,
                custodian_status,
                notification_status,
                temp_user_status,
                temp_user_days,
                cust_slno
            FROM  user 
            WHERE generatedotp = ?
            AND mobile  = ? 
            AND user_status = 1`,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertRefreshToken: (data, callBack) => {
        mysqlpool.query(
            `UPDATE user 
                SET token = ? ,
                sessionid = ? 
                WHERE user_slno = ? `,
            [
                data.refresh_token,
                data.user_slno,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    insertLoginActivity: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO user_login_history(
               log_user_slno,
               log_ip_address,
               log_browser_name,
               log_browser_version,
               log_os_name,
               log_os_version
                )
                VALUES(?,?,?,?,?,?)`,
            [
                data.user_slno,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion
            ],
            (error, results, fields) => {
                logger.error(error)
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    getRefershToken: async (id, callBack) => {
        mysqlpool.query(
            `SELECT token,sessionid FROM user WHERE user_slno = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    deleteRefreshToken: (id, callBack) => {
        mysqlpool.query(
            `UPDATE user SET token = null, sessionid = null WHERE user_slno = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    validateUserCredExcistOrNot: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                user_slno
            FROM user 
            WHERE mobile = ? || email = ? || name = ?`,
            [
                data.mobile,
                data.email,
                data.name
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    userBasedValidationCheck: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                password,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access,
                custodian_status,
                notification_status,
                temp_user_status,
                temp_user_days,
                cust_slno
            FROM  user 
            WHERE name = ?
            AND user_status = 1`,
            [
                data.userName
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    userBasedInsertRefreshToken: (data, callBack) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        mysqlpool.query(
            `UPDATE user 
                SET token = ? ,
                sessionid = ? ,
                generatedotp = ?
                WHERE user_slno = ? `,
            [
                data.refresh_token,
                data.user_slno,
                otp,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    getAllSuperUsers: (callBack) => {
        mysqlpool.query(
            'SELECT * FROM user WHERE user.login_type=2',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    verifyOTPforPrint: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                iv,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access,
                custodian_status,
                notification_status,
                temp_user_status,
                temp_user_days,
                cust_slno
            FROM  user 
            WHERE generatedotp = ?
            AND mobile  = ? 
            AND user_status = 1`,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {

                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

}

