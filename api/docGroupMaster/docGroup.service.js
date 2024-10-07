const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocGroup: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_group_master (group_name,group_status) VALUES (?,?) `,
            [
                data.group_name,
                data.group_status
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
            `UPDATE doc_group_master SET group_name = ?, group_status = ? WHERE group_slno = ? `,
            [
                data.group_name,
                data.group_status,
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
    }
}