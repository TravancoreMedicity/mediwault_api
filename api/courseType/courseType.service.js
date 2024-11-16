const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCourseType: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO course_type (course_type_name,course_type_status) VALUES (?,?)`,
            [
                data.course_type_name,
                data.course_type_status
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

    getAllCourseType: (callBack) => {
        mysqlpool.query(
            `SELECT 
                course_type_slno,
                course_type_name,
                IF(course_type_status = 1 ,'Active','Inactive') status
            FROM course_type`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseTypeSelect: (callBack) => {
        mysqlpool.query(
            `SELECT 
                course_type_slno,
                course_type_name
            FROM course_type
            WHERE course_type_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    editCourseTypeMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE course_type SET course_type_name = ?, course_type_status = ? WHERE course_type_slno = ? `,
            [
                data.course_type_name,
                data.course_type_status,
                data.course_type_slno
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

    checkDuplicateCourseTypeName: (data, callBack) => {
        mysqlpool.query(
            `SELECT course_type_slno FROM course_type WHERE course_type_name = ?`,
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