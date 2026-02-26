const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCourseType: (data, callBack) => {
        mysqlpool.query(

            `INSERT INTO course_type (course_type_name, course_type_status, create_user, create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.course_type_name,
                data.course_type_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
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
                course_type_status,
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
            `UPDATE course_type SET 
            course_type_name = ?,
            course_type_status = ?,
            edit_user=?,
            edit_ip=?,
            edit_browser_name=?,
            edit_browser_version=?,
            edit_os_name=?,
            edit_os_version=?
            WHERE course_type_slno = ? `,
            [
                data.course_type_name,
                data.course_type_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.courseSlno
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