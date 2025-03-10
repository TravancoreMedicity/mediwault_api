const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    InsertMenuName: (data, callBack) => {
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
            'SELECT * FROM menu_name',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateMenuName: (data, callBack) => {
        console.log("service", data);

        mysqlpool.query(
            `UPDATE menu_name 
                SET menu_name = ?,
                menu_module=?,
                    menu_status = ?
                WHERE menu_slno = ?`,
            [
                data.Menu_name,
                data.module_name,
                data.Menu_status,
                data.Menu_slno
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