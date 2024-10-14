const mysqlpool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertDocMaster: (data, callBack) => {
        mysqlpool.query(
            `INSERT INTO document_master (
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure,
                docStatus
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.docID,
                data.docNumber,
                data.docName,
                data.docDes,
                data.docType,
                data.docSubType,
                data.institute,
                data.course,
                data.category,
                data.subCategory,
                data.group,
                data.docDate,
                data.docVersionDate,
                data.docExpStart,
                data.docExpEnd,
                data.isRequiredExp,
                data.isSecure,
                1
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

    getDocMaster: (callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_slno,
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure
            FROM document_master 
            WHERE docStatus = 1`,
            [],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocSecureOnly: (callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_slno,
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure
            FROM document_master 
            WHERE docStatus = 1 AND isSecure = 1`,
            [],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocNonSecure: (callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_slno,
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure
            FROM document_master 
            WHERE docStatus = 1 AND isSecure = 0`,
            [],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocMasterById: (id, callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_slno,
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure
            FROM document_master 
            WHERE docStatus = 1 AND doc_slno = ?`,
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
    getDocMasterLikeName: (name, callBack) => {
        mysqlpool.query(
            `SELECT 
                doc_slno,
                doc_id,
                doc_number,
                doc_name,
                doc_desc,
                doc_type,
                doc_sub_type,
                institute,
                course,
                category,
                sub_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure
            FROM document_master 
            WHERE docStatus = 1 
            AND doc_name LIKE ?`,
            [`%${name}%`],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkDocNameDuplicate: (data, callBack) => {
        mysqlpool.query(
            `SELECT doc_slno FROM document_master WHERE doc_name = ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    inCrementDocSerialNumber: (callBack) => {
        mysqlpool.query(
            `UPDATE serial_number SET number = number +1 WHERE type = 1`,
            [],
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