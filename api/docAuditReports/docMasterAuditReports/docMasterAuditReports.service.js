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

    getSubTypeCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
              SELECT log_slno, sub_type_slno, doc_sub_type_name, doc_sub_type_status, doc_institute_status, create_user, create_date, create_ip,
              create_browser_name, create_browser_version, create_os_name, create_os_version,user.name as username,
              IF(doc_subtype_create_audit_log.doc_sub_type_status = 1,'Active','Inactive' ) docsubtype_status,
              IF(doc_subtype_create_audit_log.doc_institute_status = 1,'Yes','No' ) docinstitute_status
              FROM doc_subtype_create_audit_log
              LEFT JOIN user ON user.user_slno =doc_subtype_create_audit_log.create_user
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getSubTypeEditAuditReports: (callBack) => {
        mysqlpool.query(
            `SELECT log_slno, sub_type_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name,
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM doc_subtype_edit_audit_log
             LEFT JOIN user ON user.user_slno =doc_subtype_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },


    //document category audit report

    getDocCatCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, cat_slno, category_name, cat_status, create_user, create_date, create_ip, create_browser_name,
             create_browser_version, create_os_name, create_os_version ,user.name as username,
             IF(doc_category_created_audit_log.cat_status = 1,'Active','Inactive' ) category_status
             FROM doc_category_created_audit_log
             LEFT JOIN user ON user.user_slno =doc_category_created_audit_log.create_user
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocCatEditAuditReports: (callBack) => {
        mysqlpool.query(
            `SELECT log_slno, cat_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name, edit_browser_version, 
             edit_os_name, edit_os_version ,user.name as username
             FROM doc_category_edited_audit_log
             LEFT JOIN user ON user.user_slno =doc_category_edited_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //document sub category
    getDocSubCategoryAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, subcat_slno, subcat_name, doc_subcat_create_audit_log.cat_slno, subcat_status, doc_subcat_create_audit_log.create_user, 
             doc_subcat_create_audit_log.create_date, doc_subcat_create_audit_log.create_ip,
             doc_subcat_create_audit_log.create_browser_name, doc_subcat_create_audit_log.create_browser_version,
             doc_subcat_create_audit_log.create_os_name, doc_subcat_create_audit_log.create_os_version,user.name as username,
             IF(doc_subcat_create_audit_log.subcat_status = 1,'Active','Inactive' ) sub_category_status,category_name
             FROM doc_subcat_create_audit_log
			 LEFT JOIN user ON user.user_slno =doc_subcat_create_audit_log.create_user
             LEFT JOIN doc_category_master ON doc_category_master.cat_slno=doc_subcat_create_audit_log.cat_slno
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocSubCategoryEditAuditReports: (callBack) => {
        mysqlpool.query(
            `SELECT log_slno, subcat_slno, prev_event, new_event, edit_user, edit_date, edit_ip,edit_browser_name, edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM doc_subcat_edit_audit_log
             LEFT JOIN user ON user.user_slno =doc_subcat_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getDocNestedCatCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
              SELECT log_slno, nested_cat_slno, nested_cat_name, sub_cat_slno, nested_cat_status, doc_nestedcat_create_audit_log.create_user, 
              doc_nestedcat_create_audit_log.create_date, doc_nestedcat_create_audit_log.create_ip,
              doc_nestedcat_create_audit_log.create_browser_name, doc_nestedcat_create_audit_log.create_browser_version, doc_nestedcat_create_audit_log.create_os_name,
              doc_nestedcat_create_audit_log.create_os_version,user.name as username,doc_subcat_master.subcat_name,
              IF(doc_nestedcat_create_audit_log.nested_cat_status = 1,'Active','Inactive' ) nested_catstatus
              FROM doc_nestedcat_create_audit_log
              LEFT JOIN user ON user.user_slno=doc_nestedcat_create_audit_log.create_user
              LEFT JOIN doc_subcat_master ON doc_subcat_master.subcat_slno=doc_nestedcat_create_audit_log.sub_cat_slno
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getDocNestedCatEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` SELECT log_slno, nested_cat_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name,
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM doc_nestedcat_edit_audit_log
             LEFT JOIN user ON user.user_slno =doc_nestedcat_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getDocGroupCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
               SELECT log_slno, group_slno, group_name, group_status, create_user, create_date, create_ip, create_browser_name, 
              create_browser_version, create_os_name, create_os_version,user.name as username,
              IF(doc_group_create_audit_log.group_status = 1,'Active','Inactive' ) groupstatus
              FROM doc_group_create_audit_log
              LEFT JOIN user ON user.user_slno=doc_group_create_audit_log.create_user
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getDocGroupEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, group_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_version, edit_browser_name, edit_os_name, edit_os_version,user.name as username
             FROM doc_group_edit_audit_log
             LEFT JOIN user ON user.user_slno =doc_group_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getInstituteTypeCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
              SELECT log_slno, institute_type_slno, institute_type_name, institute_type_status, create_user, create_date,
              create_ip, create_browser_name, create_browser_version, create_os_name, create_os_version,user.name as username,
              IF(institution_type_create_audit_log.institute_type_status = 1,'Active','Inactive' ) institute_status
              FROM institution_type_create_audit_log
              LEFT JOIN user ON user.user_slno=institution_type_create_audit_log.create_user
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getInstituteTypeEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno,institute_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name,
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM institution_type_edit_audit_log
             LEFT JOIN user ON user.user_slno =institution_type_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getInstituteMastCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
               SELECT log_slno, institution_slno, institution_name, institution_mast_create_audit_log.institute_type_slno, institution_status, institution_mast_create_audit_log.create_user, 
              institution_mast_create_audit_log.create_date, institution_mast_create_audit_log.create_ip, 
              institution_mast_create_audit_log.create_browser_name, institution_mast_create_audit_log.create_browser_version, 
              institution_mast_create_audit_log.create_os_name, institution_mast_create_audit_log.create_os_version,user.name as username,
              IF(institution_mast_create_audit_log.institution_status = 1,'Active','Inactive' ) institute_status,institution_type_master.institute_type_name
              FROM institution_mast_create_audit_log
              LEFT JOIN user ON user.user_slno=institution_mast_create_audit_log.create_user
			  LEFT JOIN institution_type_master ON institution_type_master.institute_type_slno=institution_mast_create_audit_log.institute_type_slno
            `,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getInstituteMastEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, institution_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name, 
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM institution_mast_edit_audit_log
             LEFT JOIN user ON user.user_slno =institution_mast_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseTypeCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
              SELECT log_slno, course_type_slno, course_type_name, course_type_status, create_user, create_date, create_ip,
              create_browser_name, create_browser_version, create_os_name, create_os_version,user.name as username,
              IF(coursetype_create_audit_log.course_type_status = 1,'Active','Inactive' ) course_status
              FROM coursetype_create_audit_log
              LEFT JOIN user ON user.user_slno=coursetype_create_audit_log.create_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseTypeEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, course_type_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name,
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM coursetype_edit_audit_log
             LEFT JOIN user ON user.user_slno =coursetype_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseNameCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
              SELECT log_slno, course_slno, course_name, D.course_type_slno, course_status, D.create_user, D.create_date, D.create_ip,
              D.create_browser_name, D.create_browser_version, D.create_os_name, D.create_os_version,user.name as username,
              IF(D.course_status = 1,'Active','Inactive' ) course_status,course_type.course_type_name
              FROM coursemaster_create_audit_log as D
              LEFT JOIN user ON user.user_slno=D.create_user
              LEFT JOIN course_type ON course_type.course_type_slno=D.course_type_slno`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCourseNameEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, course_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name, 
             edit_browser_version, edit_os_name, edit_os_version,user.name as username
             FROM coursemaster_edit_audit_log
             LEFT JOIN user ON user.user_slno =coursemaster_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    //location
    getLocationCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
                 SELECT log_slno, loc_slno, loc_name, loc_status, create_user, create_date, create_ip, create_browser_name, 
	             create_browser_version, create_os_name, create_os_version,user.name as username,
	             IF(D.loc_status = 1,'Active','Inactive' ) locationstatus
	             FROM location_create_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.create_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getLocationEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
            SELECT log_slno, loc_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name,
            edit_browser_version, edit_os_name, edit_os_version,user.name as username
            FROM location_edit_audit_log
            LEFT JOIN user ON user.user_slno =location_edit_audit_log.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getRackCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
                 SELECT log_slno, rac_slno, rac_desc, rac_alice, D.loc_slno, rac_status, D.create_user, D.create_date, D.create_ip, D.create_browser_name, 
                 D.create_browser_version, D.create_os_name, D.create_os_version,user.name as username,location_master.loc_name,
	             IF(D.rac_status = 1,'Active','Inactive' ) rackstatus
	             FROM rackmaster_create_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.create_user
                 LEFT JOIN location_master ON location_master.loc_slno=D.loc_slno`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getRackEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
            SELECT log_slno, rac_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name, edit_browser_version,
                 edit_os_name, edit_os_version,user.name as username
	             FROM rackmaster_edit_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCustDeptCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
                 SELECT log_slno, cust_dept_slno, cust_dept_name, cust_dept_status, D.create_user, D.create_date, D.create_ip, 
                 D.create_browser_name, D.create_browser_version, D.create_os_name, D.create_os_version,user.name as username,
	             IF(D.cust_dept_status = 1,'Active','Inactive' ) custdept_status
	             FROM custodian_department_create_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.create_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCustDeptEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
             SELECT log_slno, cust_dept_slno, prev_event, new_event, edit_user,edit_ip, edit_date, edit_browser_name,
                 edit_browser_version, edit_os_name, edit_os_version,user.name as username
	             FROM custodian_department_edit_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCustMasterCreateAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
                    SELECT log_slno, D.cust_slno, cust_name, D.cust_dept_slno, cust_status, D.create_user, D.create_date, D.create_ip, 
                 D.create_browser_name, D.create_browser_version, D.create_os_name, D.create_os_version,user.name as username,
	             IF(D.cust_status = 1,'Active','Inactive' ) custstatus,custodian_department.cust_dept_name
	             FROM custodianmaster_create_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.create_user
                 LEFT JOIN custodian_department ON custodian_department.cust_dept_slno=D.cust_dept_slno`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    getCustMasterEditAuditReports: (callBack) => {
        mysqlpool.query(
            ` 
                 SELECT log_slno, D.cust_slno, prev_event, new_event, edit_user, edit_date, edit_ip, edit_browser_name, 
                 edit_browser_version, edit_os_name, edit_os_version,user.name as username
	             FROM custodianmaster_edit_audit_log as D
                 LEFT JOIN user ON user.user_slno=D.edit_user`,
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}



