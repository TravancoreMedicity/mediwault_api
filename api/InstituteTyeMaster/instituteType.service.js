const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertInstituteType: (data, callBack) => {
        mysqlpool.query(
            `INSERT institution_type_master (institute_type_name,institute_type_status) VALUES (?,?)`,
            [
                data.institute_type_name,
                data.institute_type_status
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
    editInstituteTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE institution_type_master SET institute_type_name = ?, institute_type_status = ? WHERE institute_type_slno = ? `,
            [
                data.institute_type_name,
                data.institute_type_status,
                data.institute_type_slno
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
    getAllInstituteType: (callBack) => {
        mysqlpool.query(
            `SELECT 
                institute_type_slno,
                institute_type_name,
                IF(institute_type_status = 1 ,'Active','Inactive') status
            FROM institution_type_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkDuplicateInstituteTypeName: (data, callBack) => {
        mysqlpool.query(
            `SELECT institute_type_slno FROM institution_type_master WHERE institute_type_name = ?`,
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
    getInstitutionTypeSelect: (callBack) => {
        mysqlpool.query(
            `SELECT 
                institute_type_slno,
                institute_type_name
            FROM institution_type_master 
            WHERE institute_type_status = 1`,
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