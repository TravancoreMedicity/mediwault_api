const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertUserType: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO user_type_master (user_type, use_type_status, create_user, create_date ) VALUES (?, ?, ?, ?)`,
            [
                data.user_type,
                data.user_type_status,
                data.create_user,
                data.create_date
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

    validateUserTypeExcistOrNot: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                user_type
            FROM user_type_master 
            WHERE user_type = ?`,
            [
                data.user_type
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
    GetDatas: (callBack) => {
        mysqlpool.query(
            'SELECT * FROM user_type_master where user_type_master.use_type_status=1',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
}


