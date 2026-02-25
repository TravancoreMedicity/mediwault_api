const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertSubTypeMaster: (data, callBack) => {
        mysqlpool.query(

            `INSERT INTO doc_sub_type_master (doc_sub_type_name, doc_sub_type_status, doc_institute_status, 
             create_user, create_ip, create_browser_name, create_browser_version, create_os_name,
             create_os_version) 
                VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.sub_type_name,
                data.sub_type_status,
                data.doc_institute_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion
            ],

            (error, results, fields) => {
                if (error) {
                    // console.log("error:", error);

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
                SET
                doc_sub_type_name=?,
                doc_sub_type_status=?,
                doc_institute_status=?,
                edit_user=?,
                edit_ip=?,
                edit_browser_name=?,
                edit_browser_version=?,
                edit_os_name=?,
                edit_os_version=?
                WHERE sub_type_slno = ?`,
            [
                data.sub_type_name,
                data.sub_type_status,
                data.doc_institute_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
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
                doc_institute_status,
                doc_sub_type_status
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
    },
    selectSubTypeMaster: (callBack) => {
        mysqlpool.query(
            `  SELECT 
                sub_type_slno,
                doc_sub_type_name,
                doc_institute_status
            FROM doc_sub_type_master
            WHERE doc_sub_type_status = 1`,

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