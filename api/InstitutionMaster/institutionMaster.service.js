const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertInstitutionMaster: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO institution_master (institution_name,institute_type_slno,institution_status) VALUES (?,?,?)`,
            [
                data.institution_name,
                data.institution_type_slno,
                data.institution_status
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
    getAllInstitutionMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                I.institution_slno,
                I.institution_name,
                T.institute_type_name,
                IF(I.institution_status = 1 ,'Active','Inactive') status
            FROM institution_master I
            LEFT JOIN institution_type_master T ON I.institute_type_slno = T.institute_type_slno`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    editInstitutionMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE institution_master SET institution_name = ?, institute_type_slno = ?, institution_status = ? WHERE institution_slno = ?`,
            [
                data.institution_name,
                data.institute_type_slno,
                data.institution_status,
                data.institution_slno
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
    checkDuplicateInstitutionName: (data, callBack) => {
        mysqlpool.query(
            `SELECT institution_slno FROM institution_master WHERE institution_name = ?`,
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