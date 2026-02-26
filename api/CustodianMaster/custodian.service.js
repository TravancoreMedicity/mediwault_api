const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertCustodianMaster: (data, callBack) => {
        mysqlpool.execute(
            `INSERT INTO custodian_master (cust_name, cust_dept_slno, cust_status, create_user,create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.custodian_name,
                data.custodian_department_name,
                data.custodian_status,
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
    selectCustodianMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                cust_slno,
                cust_name 
            FROM custodian_master WHERE cust_status = 1`,
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
            `UPDATE custodian_master SET 
            cust_name = ?,
            cust_dept_slno = ?,
            cust_status = ?,
            edit_user=?,
            edit_ip=?,
            edit_browser_name=?,
            edit_browser_version=?,
            edit_os_name=?,
            edit_os_version=?
            WHERE cust_slno = ?`,
            [
                data.custodian_name,
                data.custodian_department_name,
                data.custodian_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
                data.custMastSlno
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
                M.cust_status,
                M.cust_dept_slno,
                IF(M.cust_status = 0 , 'Inactive','Active') status
            FROM custodian_master M
            LEFT JOIN custodian_department D ON D.cust_dept_slno = M.cust_dept_slno
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