const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocCategory: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_category_master (category_name,cat_status) VALUES (?,?)`,
            [
                data.category_name,
                data.cat_status
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
                    cat_status = ?
                WHERE cat_slno = ? `,
            [
                data.category_name,
                data.cat_status,
                data.cat_slno
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
                IF(cat_status = 0 , 'Inactive','Active') status
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
    }
}