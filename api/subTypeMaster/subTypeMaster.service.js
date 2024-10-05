const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertSubTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_sub_type_master (doc_sub_type_name,doc_sub_type_status) 
                VALUES (?,?)`,
            [
                data.sub_type_name,
                data.sub_type_status
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
    checkSubMasterNameDuplicate: (data, callBack) => {
        mysqlpool.query(
            `SELECT sub_type_slno FROM doc_sub_type_master WHERE doc_sub_type_name = ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    editSubTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_sub_type_master 
                SET doc_sub_type_name = ?,
                    doc_sub_type_status = ? 
                WHERE sub_type_slno = ?`,
            [
                data.sub_type_name,
                data.sub_type_status,
                data.sub_type_slno
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
    getAllSubTypeMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                sub_type_slno,
                doc_sub_type_name,
                IF(doc_sub_type_status = 0 , 'Inactive','Active') status
            FROM doc_sub_type_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getSubTypeMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM doc_sub_type_master WHERE sub_type_slno = ?`,
            [id],
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