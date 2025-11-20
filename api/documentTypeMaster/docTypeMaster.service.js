const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    // TABLE NAME - doc_type_master 
    insertDocTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_type_master (doc_type_master_name, main_type_slno, doc_type_master_status, create_user,
             create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.docTypeMasterName,
                data.docMainType,
                data.docTypeMasterStatus,
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
    editDocTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_type_master 
           SET 
             doc_type_master_name = ?, 
             main_type_slno = ?, 
             doc_type_master_status = ?,
             edit_user = ?,
             edit_ip = ?,
             edit_browser_name = ?,
             edit_browser_version = ?,
             edit_os_name = ?,
             edit_os_version = ?
           WHERE doc_type_slno = ?
           `,
            [
                data.docTypeMasterName,
                data.docMainType,
                data.docTypeMasterStatus,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.docTypeSlno
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
    inactiveDocTypeMater: (id, callBack) => {
        mysqlpool.query(
            `UPDATE doc_type_master 
                SET 
                        doc_type_master_status = 2
                WHERE doc_type_slno = ?`,
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
    getDocTypeMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                D.doc_type_slno,
                D.doc_type_master_name,
                M.main_type_name,
                D.main_type_slno,
                D.doc_type_master_status,
                IF(D.doc_type_master_status = 1,'Active','Inactive' ) status
            FROM doc_type_master D
            LEFT JOIN doc_main_type M ON D.main_type_slno = M.main_type_slno`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocTypeMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM doc_type_master WHERE doc_type_slno = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    docTypeMasterNameChecking: (data, callBack) => {
        mysqlpool.query(
            `SELECT doc_type_slno FROM doc_type_master WHERE doc_type_master_name = ?`,
            [data.docTypeMasterName],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )

    },
    selectDocTypeMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_type_slno,
                doc_type_master_name
            FROM doc_type_master
            WHERE doc_type_master_status = 1`,
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