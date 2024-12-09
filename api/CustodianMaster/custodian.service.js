const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCustodianMaster: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO custodian_master (cust_name,cust_dept_slno,cust_status) VALUES (?,?,?)`,
            [
                data.custodian_name,
                data.custodian_department_name,
                data.custodian_status
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
    selectCustodianMaster: (callBack) => {
        mysqlpool.query(
            `SELECT cust_slno,cust_name FROM custodian_master WHERE cust_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    selectCustodianMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT * FROM custodian_master WHERE cust_slno = ?`,
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
    updateCustodianMaster: (data, callBack) => {
        mysqlpool.execute(
            `UPDATE custodian_master SET cust_name = ?, cust_dept_slno = ?, cust_status = ? WHERE cust_slno = ?`,
            [
                data.custodian_name,
                data.custodian_department_name,
                data.custodian_status,
                data.custodian_slno
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
    deleteCustodianMaster: (id, callBack) => {
        mysqlpool.execute(
            `UPDATE custodian_master SET cust_status = 0 WHERE cust_slno = ?`,
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
    selectCustodianMasterList: (callBack) => {
        mysqlpool.query(
            `SELECT 
                M.cust_slno,
                M.cust_name,
                D.cust_dept_name,
                IF(M.cust_status = 0 , 'Inactive','Active') status
            FROM custodian_master M
            LEFT JOIN custodian_department D ON D.cust_dept_slno = M. cust_dept_slno
            WHERE cust_status = 1`,
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkCustodianDepartment: (id, callBack) => {
        mysqlpool.query(
            `SELECT cust_slno FROM custodian_master WHERE cust_dept_slno = ? AND cust_status = 1`,
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
    }
}