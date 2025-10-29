const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertNestedDocCategory: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_nested_cat_mast (nested_cat_name,sub_cat_slno, nested_cat_status) VALUES (?,?,?)`,

            [
                data.nested_cat_name,
                data.sub_cat_slno,
                data.nested_cat_status
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

    NestedDocCategoryNameDuplicateCheck: (data, callBack) => {
        mysqlpool.query(
            `SELECT nested_cat_slno FROM doc_nested_cat_mast WHERE nested_cat_name = ?`,
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
    // SELECT nested_cat_slno, nested_cat_name, sub_cat_slno, nested_cat_status FROM medivault.doc_nested_cat_mast;

    NestedDocCategory: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_nested_cat_mast 
                SET nested_cat_name = ?,
                    sub_cat_slno = ? ,
                    nested_cat_status =? 
                WHERE nested_cat_slno = ?`,
            [
                data.nested_cat_name,
                data.sub_cat_slno,
                data.nested_cat_status,
                data.nested_cat_slno
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
            `  SELECT 
                S.nested_cat_slno,
                S.nested_cat_name,
                C.subcat_name,
                C.subcat_slno,
                IF(S.nested_cat_status = 1 , 'Active','Inactive') status
            FROM doc_nested_cat_mast S
            LEFT JOIN doc_subcat_master C ON S.sub_cat_slno = C.subcat_slno`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },



    // _________________________________________________________________________________________________

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
    getSubCategoryById: (id, callBack) => {
        mysqlpool.query(
            `SELECT 
                subcat_slno,
                subcat_name,
                cat_slno
            FROM doc_subcat_master 
            WHERE subcat_status = 1 and cat_slno= ?`,
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
}