const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertModuleGroup: (data, callBack) => {
        console.log("data", data);

        mysqlpool.execute(
            `INSERT INTO module_grp_master (module_grp_name, module_slno,module_grp_status) VALUES (?, ?, ?)`,
            [
                data.module_grp_name,
                JSON.stringify(data.module_slno),
                data.module_grp_status
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
                module_grp_name
            FROM module_grp_master 
            WHERE module_grp_name = ?`,
            [
                data.module_grp_name
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
            'SELECT * FROM module_grp_master where module_grp_master.module_grp_status=1',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
}