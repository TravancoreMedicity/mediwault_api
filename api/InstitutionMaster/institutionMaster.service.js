const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertInstitutionMaster: (data, callBack) => {
        mysqlpool.query(

            `INSERT INTO institution_master ( institution_name, institute_type_slno, institution_status, create_user, create_ip, create_browser_name, create_browser_version, create_os_name,create_os_version) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
                data.institution_name,
                data.institution_type_slno,
                data.institution_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion
            ],
            (error, results, fields) => {
                if (error) {
                    console.log("error:::", error);

                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    //  institution_name: institutionMasterState.institutionName?.trim(),
    //             institution_type_slno: institutionMasterState.institutionTypeSlno,
    //             institution_status: institutionMasterState.institutionStatus,
    //             IPAddress: IPAddress ? IPAddress : 'Unknown',
    //             browserName: browserName ? browserName : 'Unknown',
    //             browserVersion: browserVersion ? browserVersion : 'Unknown',
    //             osName: osName ? osName : 'Unknown',
    //             osVersion: osVersion ? osVersion : 'Unknown',
    //             user: Number(user),
    // institution_slno: institutionMasterState?.institution_slno


    getAllInstitutionMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                I.institution_slno,
                I.institution_name,
                T.institute_type_name,
                I.institution_status,
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
            `UPDATE institution_master SET 
            institution_name = ?,
            institute_type_slno = ?,
            institution_status = ?,
            edit_user= ?,
            edit_ip= ?,
            edit_browser_name= ?,
            edit_browser_version= ?,
            edit_os_name= ?,
            edit_os_version= ?
            WHERE institution_slno = ?`,
            [
                data.institution_name,
                data.institute_type_slno,
                data.institution_status,
                data.user,
                data.IPAddress,
                data.browserName,
                data.browserVersion,
                data.osName,
                data.osVersion,
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
    },
    selectInstituteMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                institution_slno,
                institution_name
            FROM institution_master 
            WHERE institution_status = 1`,
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