const mysqlpool = require('../../config/dbConfig')
const hrm_pool = require('../../config/hrm_dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCusDepartment: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO custodian_department (cust_dept_name, cust_dept_status, create_user, create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.custodian_department_name,
                data.custodian_department_status,
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
    selectCusDepartmentList: (callBack) => {
        mysqlpool.query(
            `SELECT 
                cust_dept_slno,
                cust_dept_name,
                cust_dept_status,
                IF(cust_dept_status = 0 , 'Inactive','Active') status
            FROM custodian_department 
            WHERE cust_dept_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateCusDepartment: (data, callBack) => {

        mysqlpool.execute(
            `UPDATE custodian_department SET
             cust_dept_name = ?,
             cust_dept_status = ?,
             edit_user=?,
             edit_ip=?,
             edit_browser_name=?,
             edit_browser_version=?,
             edit_os_name=?,
             edit_os_version=?
             WHERE cust_dept_slno = ?`,
            [
                data.custodian_department_name,
                data.custodian_department_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.custDept_slno

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
    deleteCusDepartment: (id, callBack) => {
        mysqlpool.execute(
            `UPDATE custodian_department SET cust_dept_status = 0 WHERE cust_dept_slno = ?`,
            [
                id
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
    selectCusDepartmentById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM custodian_department WHERE cust_dept_slno = ?`,
            [
                id
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
    selectCusDepartment: (callBack) => {
        mysqlpool.query(
            `SELECT cust_dept_slno,cust_dept_name FROM custodian_department WHERE cust_dept_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkCusDepartmentNameDuplicate: (name, callBack) => {
        mysqlpool.query(
            `SELECT cust_dept_slno FROM custodian_department WHERE cust_dept_name = ? AND cust_dept_status = 1`,
            [
                name
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
    selectHrDeptDetails: (callBack) => {
        hrm_pool.query(
            `SELECT dept_id, dept_name, dept_alias, dept_status, dept_type FROM medi_hrm.hrm_department where dept_status=1 ORDER BY dept_name ASC`,
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