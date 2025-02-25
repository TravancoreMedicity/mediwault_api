const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertModuleName: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO module_name (module_name, module_status) VALUES (?, ?)`,
            [
                data.module_name,
                data.module_status
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
    validateModuleNameExcistOrNot: (data, callBack) => {
        mysqlpool.query(
            `SELECT 
                module_name.module_name
            FROM module_name 
            WHERE module_name.module_name = ?`,
            [
                data.module_name
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
            'SELECT * FROM module_name where module_name.module_status=1',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
}