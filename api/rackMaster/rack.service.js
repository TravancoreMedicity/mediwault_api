// @ts-nocheck
const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertRackMaster: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO rack_master (rac_desc, rac_alice, loc_slno, rac_status) VALUES (?, ?, ?, ?)`,
            [
                data.rack_name,
                data.rack_short_name,
                data.location_name,
                data.rack_status
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
            `UPDATE rack_master SET rac_desc = ?, rac_alice = ?, loc_slno = ?, rac_status = ? WHERE rac_slno = ?`,
            [
                data.rack_name,
                data.rack_short_name,
                data.location_name,
                data.rack_status,
                data.rack_slno
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