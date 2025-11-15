const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocGroup: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_group_master (group_name, group_status, create_user,create_ip, create_browser_name, create_browser_version, create_os_name,create_os_version) VALUES (?,?,?,?,?,?,?,?) `,
            [
                data.group_name,
                data.group_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion
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
    editDocGroup: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_group_master SET
             group_name = ?,
             group_status = ?,
             edit_user=?,
             edit_ip=?,
             edit_browser_name=?,
             edit_browser_version=?,
             edit_os_name=?,
             edit_os_version=?
             WHERE group_slno = ? `,
            [
                data.group_name,
                data.group_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.group_slno
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
    getAllDocGroup: (callBack) => {
        mysqlpool.query(
            `SELECT 
                group_slno, 
                group_name,
                group_status,
                IF(group_status = 1 , 'Active','Inactive') status 
            FROM doc_group_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkGroupNameDuplicate: (data, callBack) => {
        mysqlpool.query(
            `SELECT group_slno FROM doc_group_master WHERE group_name = ?`,
            [
                data
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
    getSelectGroupList: (callBack) => {
        mysqlpool.query(
            `SELECT 
                group_slno, 
                group_name 
            FROM doc_group_master 
            WHERE group_status = 1`,
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