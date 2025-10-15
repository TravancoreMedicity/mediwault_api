const mysqlpool = require('../../config/dbConfig')
const hrm_pool = require('../../config/hrm_dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCusDepartment: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO custodian_department (cust_dept_name,cust_dept_status) VALUES (?,?)`,
            [
                data.custodian_department_name,
                data.custodian_department_status
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
            `UPDATE custodian_department SET cust_dept_name = ?, cust_dept_status = ? WHERE cust_dept_slno = ?`,
            [
                data.custodian_department_name,
                data.custodian_department_status,
                data.custodian_department_slno
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