const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertModuleGroup: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO module_grp_master (module_user_type, module_slno,module_grp_status) VALUES (?, ?, ?)`,
            [
                data.module_user_type,
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
                module_user_type
            FROM module_grp_master 
            WHERE module_user_type = ?`,
            [
                data.module_user_type
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
            'SELECT * FROM module_grp_master ',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    EditModuleGroup: (data, callBack) => {
        mysqlpool.query(
            `UPDATE module_grp_master 
                SET module_user_type = ?,
                    module_slno = ?,
                    module_grp_status = ?
                WHERE mgro_slno = ?`,
            [
                data.module_user_type,
                JSON.stringify(data.module_slno),
                data.module_grp_status,
                data.module_grp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}