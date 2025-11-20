const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocCategory: (data, callBack) => {
        mysqlpool.query(

            `INSERT INTO doc_category_master (category_name, cat_status, create_user, create_ip, create_browser_name, create_browser_version, create_os_name,create_os_version) VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.category_name,
                data.cat_status,
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
    editDocCategory: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_category_master
                SET category_name = ?,
                    cat_status = ?,
                    edit_user=?,
                    edit_ip=?,
                    edit_browser_name=?,
                    edit_browser_version=?,
                    edit_os_name=?,
                    edit_os_version=?
                WHERE cat_slno = ? `,
            [
                data.category_name,
                data.cat_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.category_slno
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
    getAllDocCategory: (callBack) => {
        mysqlpool.query(
            `SELECT 
                cat_slno,
                category_name,
                cat_status
            FROM doc_category_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    // IF(cat_status = 0 , 'Inactive','Active') status

    getDocCategoryById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM doc_category_master WHERE cat_slno = ?`,
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
    docCategoryDuplicateCheck: (data, callBack) => {
        mysqlpool.query(
            `SELECT cat_slno FROM doc_category_master WHERE category_name = ?`,
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
    selectCategoryMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                cat_slno,
                category_name
            FROM doc_category_master 
            WHERE cat_status = 1`,
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