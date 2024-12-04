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
                is_limited_user,
                login_method_allowed,
                created_user,
                last_passwd_change_date
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_Type,
                data.password,
                data.password_Validity,
                data.password_validity_expiry_date,
                data.user_Status,
                data.signIn_Limit,
                data.setOndayLogin,
                data.loginMethod,
                data.created_by,
                data.lastPasswordChangeDate
            ],
            (error, results, fields) => {
                logger.error(error)
                console.log(error)
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    editUser: (data, callBack) => {
        mysqlpool.query(
            `UPDATE user 
                SET name = ?,
                    mobile = ?,
                    email = ?,
                    login_type = ?,
                    password = ?,
                    password_validity = ?,
                    user_status = ?,
                    last_passwd_change_date = ?,
                    last_login_date = ?,
                    login_location = ?
                WHERE user_slno = ?`,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_Type,
                data.password,
                data.password_Validity,
                data.user_Status,
                data.passDateChange,
                data.lastLoginDate,
                data.loginLocation,
                data.userSlno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
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
                login_method_allowed
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
                login_method_allowed
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
}