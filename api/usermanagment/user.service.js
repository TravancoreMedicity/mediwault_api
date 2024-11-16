const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertUser: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO user (name,mobile,email,login_type,password,password_validity,user_status) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_Type,
                data.password,
                data.password_Validity,
                data.user_Status
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
                last_passwd_change_date
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
    }
}