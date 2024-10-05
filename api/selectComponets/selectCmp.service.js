const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    docMainTypeMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                main_type_slno,
                main_type_name
            FROM medivault.doc_main_type 
            WHERE main_type_status = 0`,
            (error, results, fields) => {
                logger.error(error)
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}