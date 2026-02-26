const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertLocationMaster: (data, callBack) => {


        mysqlpool.query(
            `INSERT INTO location_master (loc_name, loc_status, create_user, create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version)
                VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.location_name,
                data.location_status,
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
    selectLocationMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                loc_slno,
                loc_name,
                loc_status,
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

    // SELECT loc_slno, loc_name, loc_status, create_user, create_date, create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version, edit_ip,
    //     edit_user, edit_date, edit_browser_name, edit_browser_version, edit_os_name, edit_os_version FROM medivault.location_master;
    updateLocationMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE location_master SET
             loc_name = ?,
             loc_status = ?,
             edit_user=?,
             edit_ip=?,
             edit_browser_name=?,
             edit_browser_version=?,
             edit_os_name=?,
             edit_os_version=?
             WHERE loc_slno = ?`,
            [
                data.location_name,
                data.location_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
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
    },
    getSelectLocationMasterLIst: (callBack) => {
        mysqlpool.query(
            `SELECT 
                loc_slno,
                loc_name
            FROM location_master WHERE loc_status = 1`,
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