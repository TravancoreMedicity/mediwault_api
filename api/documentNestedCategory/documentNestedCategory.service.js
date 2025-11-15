const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertNestedDocCategory: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_nested_cat_mast (nested_cat_name, sub_cat_slno, nested_cat_status, create_user, create_ip,
             create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.nested_cat_name,
                data.sub_cat_slno,
                data.nested_cat_status,
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

    NestedDocCategory: (data, callBack) => {
        mysqlpool.query(
            `UPDATE doc_nested_cat_mast 
                SET nested_cat_name = ?,
                    sub_cat_slno = ?,
                    nested_cat_status =?,
                    edit_user=?,
                    edit_ip=?,
                    edit_browser_name=?,
                    edit_browser_version=?,
                    edit_os_name=?,
                    edit_os_version=?
                WHERE nested_cat_slno = ?`,
            [
                data.nested_cat_name,
                data.sub_cat_slno,
                data.nested_cat_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.nestedCat_slno
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
                S.nested_cat_status,
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