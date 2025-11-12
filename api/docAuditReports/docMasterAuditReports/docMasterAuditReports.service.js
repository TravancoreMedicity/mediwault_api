// @ts-nocheck
const mysqlpool = require('../../../config/dbConfig')

module.exports = {

    getdocMasterCreateAuditReports: (callBack) => {
        mysqlpool.query(
            `SELECT  audit_slno, audit_new_event, doc_number, created_time_date, create_user,ip_address, browser_name, browser_version, os_name, os_version, user.name as username
             from documentmaster_create_audit_log
             LEFT JOIN user ON user.user_slno =documentmaster_create_audit_log.create_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getdocMasterEditAuditReports: (callBack) => {
        mysqlpool.query(
            `SELECT audit_slno, audit_prev_event, audit_doc_no, audit_new_event, audit_log_time, audit_log_user,
             ip_address, browser_name, browser_version, os_name, os_version ,user.name as username
             FROM documentmaster_edit_audit_log
             LEFT JOIN user ON user.user_slno =documentmaster_edit_audit_log.audit_log_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getdocDetailCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` select docd_slno, doc_id, doc_number, originalname, mimetype, filename, docVer, docVer_amentment, dovVer_infoAment, 
              created_ip_address, document_detl.created_browser_name,docCreatedDate,
              document_detl.created_browser_version, document_detl.created_os_name, document_detl.created_os_version,user.name as username
              from document_detl
              LEFT JOIN user ON user.user_slno =document_detl.docCreateUser 
              where docActiveStatus=1
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getdocDetailEditAuditReports: (callBack) => {
        mysqlpool.query(
            `select log_slno, doc_slno, document_no, document_id, prev_event, new_event, replace_user, replace_date, 
             replaced_ip_address, replaced_browser_name, replaced_os_name, replaced_os_version, replaced_browser_version, active_status,user.name as username
             from document_detail_replace_audit_log
             LEFT JOIN user ON user.user_slno =document_detail_replace_audit_log.replace_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    ////user management

    getUserCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             select user_slno, name, mobile, email,
             user_status, last_passwd_change_date, last_login_date, sign_in_per_day_limit,
             sign_in_per_day_count, is_limited_user,  created_user, created_time,
             printer_access, custodian_status, notification_status, temp_user_status, temp_user_days,
             created_ip, created_browser_name, created_browser_version, 
             created_os_name, created_os_version
             from user
             `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserEditAuditReports: (callBack) => {
        mysqlpool.query(
            `select user_slno, log_slno, prev_event, new_event,
             user_edited_audit_log.updated_user, user_edited_audit_log.updated_time,
             user_edited_audit_log.edited_ip, user_edited_audit_log.edited_browser_name, 
             user_edited_audit_log.edited_browser_version,
             user_edited_audit_log.edited_os_name, user_edited_audit_log.edited_os_version,user.name as username,user.user_slno as userId
             from user_edited_audit_log
             LEFT JOIN user ON user.user_slno =user_edited_audit_log.updated_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getDocTypeCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, doc_type_slno, doc_type_master_name, doc_type_master_create_audit_log.main_type_slno, doc_type_master_status, create_user, create_date, create_ip,
             create_browser_name, create_browser_version, create_os_name, create_os_version,user.name as username,doc_main_type.main_type_name,
             IF(doc_type_master_create_audit_log.doc_type_master_status = 1,'Active','Inactive' ) status
             from doc_type_master_create_audit_log
             LEFT JOIN user ON user.user_slno =doc_type_master_create_audit_log.create_user
             LEFT JOIN doc_main_type ON doc_main_type.main_type_slno =doc_type_master_create_audit_log.main_type_slno
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocTypeEditAuditReports: (callBack) => {
        mysqlpool.query(
            `select log_slno, doc_type_slno, prev_event, new_event, edit_user, edit_date,
             edit_ip, edit_browser_name, edit_browser_version, edit_os_name, edit_os_version,
             user.name as username
             from doc_type_master_edited_audit_log
             LEFT JOIN user ON user.user_slno =doc_type_master_edited_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

}


