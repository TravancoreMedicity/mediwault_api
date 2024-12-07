const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertLocationMaster: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO location_master (loc_name,loc_status)
                VALUES (?,?)`,
            [
                data.locationName,
                data.locationStatus
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
    selectLocationMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                loc_slno,
                loc_name,
                IF(loc_status = 0 , 'Inactive','Active') status
            FROM location_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateLocationMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE location_master SET loc_name = ?, loc_status = ? WHERE loc_slno = ?`,
            [
                data.locationName,
                data.locationStatus,
                data.locationSlno
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
    deleteLocationMaster: (id, callBack) => {
        mysqlpool.query(
            `UPDATE location_master SET loc_status = 0 WHERE loc_slno = ?`,
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
    getLocationMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM location_master WHERE loc_slno = ?`,
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
    }

}