const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    InsertMenuName: (data, callBack) => {
        console.log("data", data);

        mysqlpool.execute(
            `INSERT INTO menu_name ( menu_name, menu_module, menu_status) VALUES ( ?, ?, ?)`,
            [
                data.Menu_name,
                data.module_name,
                data.Menu_status
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
    validateMenuNameExcistOrNot: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                menu_name
            FROM menu_name 
            WHERE menu_name = ?`,
            [
                data.Menu_name
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
            'SELECT * FROM menu_name where menu_name.menu_status=1',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
}