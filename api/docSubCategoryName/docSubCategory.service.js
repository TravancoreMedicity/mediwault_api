const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocSubCategory: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_subcat_master (subcat_name,cat_slno,subcat_status) VALUES (?,?,?)`,
            [
                data.doc_sub_type_name,
                data.category_slno,
                data.status
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
    editDocSubCategory: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_subcat_master 
                SET subcat_name = ?,
                    cat_slno = ? ,
                    subcat_status =? 
                WHERE subcat_slno = ?`,
            [
                data.doc_sub_type_name,
                data.category_slno,
                data.status,
                data.subCatSlno
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
    getAllDocSubCategory: (callBack) => {
        mysqlpool.query(
            `SELECT 
                S.subcat_slno,
                S.subcat_name,
                C.category_name,
                IF(S.subcat_status = 1 , 'Active','Inactive') status
            FROM doc_subcat_master S
            LEFT JOIN doc_category_master C ON S.cat_slno = C.cat_slno`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    subCategoryNameDuplicateCheck: (data, callBack) => {
        mysqlpool.query(
            `SELECT subcat_slno FROM doc_subcat_master WHERE subcat_name = ?`,
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
    getSubCategoryList: (callBack) => {
        mysqlpool.query(
            `SELECT 
                subcat_slno,
                subcat_name,
                cat_slno
            FROM doc_subcat_master 
            WHERE subcat_status = 1`,
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