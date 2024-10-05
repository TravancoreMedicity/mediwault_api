const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocSubCategory: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO doc_subcat_master (subcat_name,cat_slno,subcat_status) VALUES (?,?,?)`,
            [
                data.subCatName,
                data.cat_slno,
                data.subCatStatus
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
                data.subCatName,
                data.cat_slno,
                data.subCatStatus,
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
                subcat_slno,
                subcat_name,
                IF(subcat_status = 0 , 'Inactive','Active') status
            FROM doc_subcat_master`,
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