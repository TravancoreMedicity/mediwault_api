const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCourseMater: (data, callBack) => {

        // SELECT course_slno, course_name, course_type_slno, course_status, create_user, create_date, create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version, edit_user, edit_date, edit_ip, edit_browser_name, edit_browser_version, edit_os_name, edit_os_version FROM medivault.course_master;

        mysqlpool.query(
            `INSERT INTO course_master (course_name, course_type_slno, course_status, create_user,create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.course_name,
                data.course_type_slno,
                data.course_status,
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

    editCourseMaster: (data, callBack) => {
        mysqlpool.query(
            `UPDATE course_master SET
             course_name = ?,
             course_type_slno = ?,
             course_status = ?,
             edit_user=?,
             edit_ip=?,
             edit_browser_name=?,
             edit_browser_version=?,
             edit_os_name=?,
             edit_os_version=?
             WHERE course_slno = ? `,
            [
                data.course_name,
                data.course_type_slno,
                data.course_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.courseName_slno
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
                course_master.course_status,
                course_master.course_type_slno,
                IF(course_master.course_status = 1 ,'Active','Inactive') coursestatus
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
            FROM course_master
            WHERE course_status = 1`,
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