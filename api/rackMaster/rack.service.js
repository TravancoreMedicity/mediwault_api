// @ts-nocheck
const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertRackMaster: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO rack_master (rac_desc, rac_alice, loc_slno, rac_status, create_user, create_ip,
            create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?, ?, ?, ?,?, ?, ?, ?,?,?)`,
            [
                data.rack_name,
                data.rack_short_name,
                data.location_name,
                data.rack_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
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
    updateRackMaster: (data, callBack) => {
        mysqlpool.execute(
            `UPDATE rack_master SET
             rac_desc = ?,
             rac_alice = ?,
             loc_slno = ?,
             rac_status = ?,
             edit_user=?,
             edit_ip=?,
             edit_browser_name=?,
             edit_browser_version=?,
             edit_os_name=?,
             edit_os_version=?
             WHERE rac_slno = ?`,
            [
                data.rack_name,
                data.rack_short_name,
                data.location_name,
                data.rack_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.rackSlno
            ],
            (error, results, fields) => {
                // console.log("error::", error);

                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    deleteRackMaster: (id, callBack) => {
        mysqlpool.execute(
            `UPDATE rack_master SET rac_status = 0 WHERE rac_slno = ?`,
            [
                id
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
    selectRackMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                R.rac_slno,
                R.rac_desc,
                R.rac_alice,
                L.loc_name,
                R.loc_slno,
                R.rac_status,
                IF(R.rac_status = 0 , 'Inactive','Active') status
            FROM rack_master R
            LEFT JOIN location_master L ON L.loc_slno = R.loc_slno
            WHERE R.rac_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    selectRackMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM rack_master WHERE rac_slno = ?`,
            [
                id
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
    selectCmpRackMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                R.rac_slno,
                CONCAT(R.rac_alice ,' - ', UPPER(L.loc_name)) AS rack
            FROM rack_master R
            LEFT JOIN location_master L ON L.loc_slno = R.loc_slno
            WHERE R.rac_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

}