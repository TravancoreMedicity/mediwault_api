const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCourseMater: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO course_master (course_name,course_type_slno,course_status) VALUES (?,?,?)`,
            [
                data.course_name,
                data.course_type_slno,
                data.course_status
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

    editCourseMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE course_master SET course_name = ?, course_type_slno = ?, course_status = ? WHERE course_slno = ? `,
            [
                data.course_name,
                data.course_type_slno,
                data.course_status,
                data.course_slno
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

    getAllCourseMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                course_master.course_slno,
                course_master.course_name,
                course_type.course_type_name,
                IF(course_master.course_status = 1 ,'Active','Inactive') course_status
            FROM course_master 
            LEFT JOIN course_type ON course_type.course_type_slno = course_master.course_type_slno`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM course_master WHERE course_slno = ?`,
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
    getSelectCourseMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                course_slno,
                course_name
            FROM course_master`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkCourserName: (data, callBack) => {
        mysqlpool.query(
            `SELECT course_slno FROM course_master WHERE course_name = ?`,
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