const mysqlpool = require("../../config/dbConfig");
const logger = require("../../logger/logger");

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
                nested_category,
                group_mast,
                doc_date,
                doc_ver_date,
                doc_exp_start,
                doc_exp_end,
                isRequiredExp,
                isSecure,
                docStatus,
                docRack,
                docCustodian,
                docVer,
                docVer_amentment,
                dovVer_infoAment,
                uploadUser,
                uploadDate,
                short_name,
                lifelong_validity,
                days_torenew,
                created_ip_address,
                created_browser_name,
                created_browser_version,
                created_os_name,
                created_os_version
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

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
        data.nestedCategory,
        data.group,
        data.docDate,
        data.docVersionDate,
        data.docExpStart,
        data.docExpEnd,
        data.isRequiredExp,
        data.isSecure,
        1,
        data.docRack,
        data.docCustodian,
        data.docVersion,
        data.docVersionAment,
        data.docVersionInfoEdit,
        data.userID,
        data.docUpload,
        data.shortName,
        data.lifeLongValidity,
        data.DaysToRenew,
        data.IPAddress,
        data.browserName,
        data.browserVersion,
        data.osName,
        data.osVersion
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDocMaster: (callBack) => {
    mysqlpool.query(
      `SELECT
            ROW_NUMBER() OVER () as doc_slno,
         
          D.doc_id,
          D.doc_number,
          CONCAT(D.docVer ,'.', D.docVer_amentment,'.',D.dovVer_infoAment) AS docVer,
          D.doc_name,
          D.doc_desc,
          T.doc_type_master_name,
          S.doc_sub_type_name,
          I.institution_name,
          C.course_name,
          A.category_name,
          M.subcat_name,
          G.group_name,
          D.doc_date,
          D.doc_ver_date,
          D.apprvl_status,
          D.isSecure,
          D.category,
          D.doc_sub_type,
          D.nested_category,
          J.nested_cat_name
      FROM document_master D
      LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
      LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
      LEFT JOIN institution_master I ON I.institution_slno = D.institute
      LEFT JOIN course_master C ON C.course_slno = D.course
      LEFT JOIN doc_category_master A ON A.cat_slno = D.category
      LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
      LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
      LEFT JOIN doc_nested_cat_mast J ON J.nested_cat_slno = D.nested_category
      WHERE D.docStatus = 1`,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getNonSecDocMaster: (callBack) => {
    mysqlpool.query(
      `SELECT
            ROW_NUMBER() OVER () as doc_slno,
          D.doc_id,
          D.doc_number,
          CONCAT(D.docVer ,'.', D.docVer_amentment,'.',D.dovVer_infoAment) AS docVer,
          D.doc_name,
          D.doc_desc,
          T.doc_type_master_name,
          S.doc_sub_type_name,
          I.institution_name,
          C.course_name,
          A.category_name,
          M.subcat_name,
          G.group_name,
          D.doc_date,
          D.doc_ver_date,
          D.apprvl_status,
          D.isSecure
      FROM document_master D
      LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
      LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
      LEFT JOIN institution_master I ON I.institution_slno = D.institute
      LEFT JOIN course_master C ON C.course_slno = D.course
      LEFT JOIN doc_category_master A ON A.cat_slno = D.category
      LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
      LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
      WHERE D.docStatus = 1 and D.isSecure=0`,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDocSecureOnly: (callBack) => {
    mysqlpool.query(
      `SELECT 
          D.doc_slno,
          D.doc_id,
          D.doc_number,
          D.doc_name,
          D.doc_desc,
          T.doc_type_master_name,
          S.doc_sub_type_name,
          I.institution_name,
          C.course_name,
          A.category_name,
          M.subcat_name,
          G.group_name,
          D.doc_date,
          D.doc_ver_date,
          D.isSecure
      FROM document_master D
      LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
      LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
      LEFT JOIN institution_master I ON I.institution_slno = D.institute
      LEFT JOIN course_master C ON C.course_slno = D.course
      LEFT JOIN doc_category_master A ON A.cat_slno = D.category
      LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
      LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
      WHERE D.docStatus = 1`,
      [],
      //  WHERE D.docStatus = 1 ORDER BY D.doc_slno DESC LIMIT 20
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getDocNonSecure: (callBack) => {
    mysqlpool.query(
      `SELECT 
          D.doc_slno,
          D.doc_id,
          D.doc_number,
          D.doc_name,
          D.doc_desc,
          T.doc_type_master_name,
          S.doc_sub_type_name,
          I.institution_name,
          C.course_name,
          A.category_name,
          M.subcat_name,
          G.group_name,
          D.doc_date,
          D.doc_ver_date,
          D.isSecure
      FROM document_master D
      LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
      LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
      LEFT JOIN institution_master I ON I.institution_slno = D.institute
      LEFT JOIN course_master C ON C.course_slno = D.course
      LEFT JOIN doc_category_master A ON A.cat_slno = D.category
      LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
      LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
      WHERE D.docStatus = 1 AND D.isSecure = 0 `,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getDocMasterById: (id, callBack) => {
    mysqlpool.query(
      `SELECT 
            D.doc_slno,
            D.doc_id,
            D.doc_number,
            D.doc_name,
            D.doc_desc,
            D.doc_type, -- DOC TYPE
            T.main_type_name,
            D.doc_sub_type, -- DOC-SUB-TYPE
            S.doc_sub_type_name,
            D.institute, -- INSTITUTE
            I.institution_name,
            D.course, -- COURSE
            C.course_name,
            D.category, -- CATEGORY
            G.category_name,
            D.sub_category, -- SUB CATEGORY
            SC.subcat_name,
            D.group_mast, -- GROUP MASTER 
            DG.group_name,
            D.docVer,
            D.docVer_amentment,
            D.dovVer_infoAment,
            D.doc_date, 
            D.doc_ver_date,
            D.doc_exp_start,
            D.doc_exp_end,
            D.isRequiredExp,
            D.isSecure,
            D.docRack, -- RACK NAME
            R.rac_desc,
            LM.loc_name,
            CONCAT(R.rac_alice ,' - ', UPPER(LM.loc_name)) AS rack, -- RACK AND LOCATION NAME
            D.docCustodian, 
            CN.cust_name,-- CUSTODIAN NAME
            D.uploadUser,
            U.name,
            D.uploadDate,
            D.apprvl_status,
            D.apprvl_user,
            D.apprvl_date,
            D.short_name,
            D.lifelong_validity,
            D.days_torenew,
            D.short_name,
            D.lifelong_validity,
            D.days_torenew,
            D.nested_category,
            J.nested_cat_name
        FROM document_master D
      LEFT JOIN doc_main_type T ON T.main_type_slno = D.doc_type
            LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
            LEFT JOIN institution_master I ON I.institution_slno = D.institute
            LEFT JOIN course_master C ON C.course_slno = D.course
            LEFT JOIN doc_category_master G ON G.cat_slno = D.category
            LEFT JOIN doc_subcat_master SC ON SC.subcat_slno = D.sub_category
            LEFT JOIN doc_group_master DG ON DG.group_slno = D.group_mast
            LEFT JOIN rack_master R ON R.rac_slno = D.docRack
            LEFT JOIN location_master LM ON LM.loc_slno = R.loc_slno
            LEFT JOIN custodian_master CN ON CN.cust_slno = D.docCustodian
            LEFT JOIN user U ON U.user_slno = D.uploadUser
            LEFT JOIN doc_nested_cat_mast J ON J.nested_cat_slno = D.nested_category
        WHERE docStatus = 1 AND doc_slno = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getDocMasterLikeName: (id, callBack) => {
    mysqlpool.query(
      `SELECT 
        D.doc_slno,
        D.doc_id,
        D.doc_number,
        D.doc_name,
        D.doc_desc,
        T.doc_type_master_name,
        S.doc_sub_type_name,
        I.institution_name,
        C.course_name,
        A.category_name,
        M.subcat_name,
        G.group_name,
        D.doc_date,
        D.doc_ver_date,
        D.isSecure
    FROM document_master D
    LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
    LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
    LEFT JOIN institution_master I ON I.institution_slno = D.institute
    LEFT JOIN course_master C ON C.course_slno = D.course
    LEFT JOIN doc_category_master A ON A.cat_slno = D.category
    LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
    LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
    WHERE D.docStatus = 1 AND D.doc_name LIKE ? ORDER BY D.doc_slno DESC LIMIT 20`,
      [`%${id}%`],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getDocMasterLikeNameNonSecureOnly: (id, callBack) => {
    mysqlpool.query(
      `SELECT 
        D.doc_slno,
        D.doc_id,
        D.doc_number,
        D.doc_name,
        D.doc_desc,
        T.doc_type_master_name,
        S.doc_sub_type_name,
        I.institution_name,
        C.course_name,
        A.category_name,
        M.subcat_name,
        G.group_name,
        D.doc_date,
        D.doc_ver_date,
        D.isSecure
    FROM document_master D
    LEFT JOIN doc_type_master T ON T.doc_type_slno = D.doc_type
    LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
    LEFT JOIN institution_master I ON I.institution_slno = D.institute
    LEFT JOIN course_master C ON C.course_slno = D.course
    LEFT JOIN doc_category_master A ON A.cat_slno = D.category
    LEFT JOIN doc_subcat_master M ON M.subcat_slno = D.sub_category
    LEFT JOIN doc_group_master G ON G.group_slno = D.group_mast
    WHERE D.docStatus = 1 AND D.doc_name LIKE ? AND D.isSecure = 0 ORDER BY D.doc_slno DESC LIMIT 20`,
      [`%${id}%`],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  checkDocNameDuplicate: (data, callBack) => {
    mysqlpool.query(
      `SELECT doc_slno FROM document_master WHERE doc_name = ?`,
      [data],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  inCrementDocSerialNumber: (callBack) => {
    // console.log("inCrementDocSerialNumber");

    mysqlpool.query(
      `UPDATE serial_number SET number = number +1 WHERE type = 1`,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  // insertDocDetl: (data) =>
  //   data?.map(
  //     (item) =>
  //       new Promise((resolve, reject) => {
  //         // console.log("insertDocDetl item", item);

  //         mysqlpool.query(
  // `INSERT INTO document_detl (
  //     doc_id,
  //     doc_number,
  //     originalname,
  //     mimetype,
  //     filename,
  //     docVer,
  //     docVer_amentment,
  //     dovVer_infoAment,
  //     docVerDate,
  //     docCreatedDate,
  //     docCreateUser
  //   ) 
  //   VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  // [
  //   item.docID,
  //   item.docNumber,
  //   item.originalname,
  //   item.mimetype,
  //   item.filename,
  //   item.docVersion,
  //   item.docVersionAment,
  //   item.docVersionInfoEdit,
  //   item.docCreatedDate,
  //   item.docCreatedDate,
  //   item.docCreatedBy
  // ],
  //           (error, results, fields) => {
  //             if (error) {
  //               logger.error(error);
  //               return reject(error);
  //             }
  //             return resolve(results);
  //           }
  //         );
  //       })
  //   ),



  insertDocDetl: (data) =>
    data?.map(
      (item) =>
        new Promise((resolve, reject) => {
          // console.log("insertDocDetl item", item);

          mysqlpool.query(
            `INSERT INTO document_detl (
                doc_id,
                doc_number,
                originalname,
                mimetype,
                filename,
                docVer,
                docVer_amentment,
                dovVer_infoAment,
                docVerDate,
                docCreatedDate,
                docCreateUser,
                created_ip_address,
                created_browser_name,
                created_browser_version,
                created_os_name,
                created_os_version
              ) 
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
              item.docID,
              item.docNumber,
              item.originalname,
              item.mimetype,
              item.filename,
              item.docVersion,
              item.docVersionAment,
              item.docVersionInfoEdit,
              item.docCreatedDate,
              item.docCreatedDate,
              item.docCreatedBy,
              item.IPAddress,
              item.browserName,
              item.browserVersion,
              item.osName,
              item.osVersion
            ],
            (error, results) => {
              if (error) return reject(error);



              // Now insert into log
              mysqlpool.query(
                `INSERT INTO document_detl_log (
                 doc_id,
                  doc_number,
                   originalname,
                    mimetype,
                     filename,
                      docVer,
                       docVer_amentment,
                        docVer_infoAment,
                         docVerDate,
                          docCreatedDate,
                           docCreateUser,
                                create_user
              ) 
              VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                  item.docID,
                  item.docNumber,
                  item.originalname,
                  item.mimetype,
                  item.filename,
                  item.docVersion,
                  item.docVersionAment,
                  item.docVersionInfoEdit,
                  item.docCreatedDate,
                  item.docCreatedDate,
                  item.docCreatedBy,
                  item.docCreatedBy
                ], // use the same or copied data
                (logError, logResults) => {
                  if (logError) return reject(logError);
                  return resolve(logResults);
                }
              );
            }
          );
        })
    ),


  getDocDetlinfo: (id, callBack) => {
    mysqlpool.query(
      `SELECT
          D.docd_slno,
          D.doc_id,
          D.doc_number,
          D.originalname,
          D.mimetype,
          D.filename,
          D.docVer,
          D.docVer_amentment,
          D.dovVer_infoAment,
          D.docVerDate,
          D.docCreateUser,
          U.name,
          D.docCreatedDate,
          D.docActiveStatus
      FROM document_detl D
      LEFT JOIN user U ON U.user_slno = D.docCreateUser
      WHERE doc_id = ? ORDER BY D.docActiveStatus ASC ,D.docVer DESC, D.docVer_amentment DESC`,
      [id],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getDocTypeCount: (callBack) => {
    mysqlpool.query(
      `SELECT 
          D.doc_type_master_name,D.doc_type_slno,
          COUNT(M.doc_slno) COUNT
        FROM doc_type_master D
        LEFT JOIN document_master M ON D.doc_type_slno = M.doc_type AND M.docStatus = 1
        WHERE D.doc_type_master_status = 1 
        GROUP BY D.doc_type_master_name`,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSearchData: (sql, callBack) => {
    mysqlpool.query(
      sql,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateDocMaster: (data, callBack) => {
    // console.log("data:::::::::::", data);

    mysqlpool.query(
      `UPDATE document_master 
        SET 
          doc_name = ?,
          doc_desc = ?,
          doc_type = ?,
          doc_sub_type = ?,
          institute = ?,
          course = ?,
          category = ?,
          sub_category = ?,
          nested_category=?,
          group_mast = ?,
          docRack = ?,
          docCustodian = ?,
          docVer = ?,
          docVer_amentment = ?,
          dovVer_infoAment = ?,
          doc_ver_date = ?,
          doc_exp_start = ?,
          doc_exp_end = ?,
          isRequiredExp = ?,
          isSecure = ?,
          short_name=?,
          lifelong_validity=?,
          days_torenew=?,
          editUser = ?,
          editDate = ?,
          edited_ip_address=?,
          edited_browser_name=?,
          edited_browser_version=?,
          edited_os_name=?,
          edited_os_version=?
        WHERE doc_id = ? `,
      [
        data.docName,
        data.docDes,
        data.docType,
        data.docSubType,
        data.institute,
        data.course,
        data.category,
        data.subCategory,
        data.nested_category,
        data.group,
        data.docRack,
        data.docCustodian,
        data.docVersion,
        data.docVersionAment,
        data.docVersionInfoEdit,
        data.docVersionDate,
        data.docExpStart,
        data.docExpEnd,
        data.isRequiredExp,
        data.isSecure,
        data.short_name,
        data.lifelong_validity,
        data.days_torenew,
        data.userID,
        data.docEditDate,
        data.IPAddress,
        data.browserName,
        data.browserVersion,
        data.osName,
        data.osVersion,
        data.docID,

        // docVersionInfoEdit
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //update detail master


  updateDetailTableVals: (data, callBack) => {
    // console.log("dataaaaaaa:", data);

    mysqlpool.query(
      `UPDATE document_detl 
        SET 
          dovVer_infoAment=?,
          docEditDate=?,
          docEditUser=?,
          docAmentDate=?,
          docAmentUser=?,
          edited_ip_address=?,
          edited_browser_name=?,
          edited_browser_version=?,
          edited_os_name=?,
          edited_os_version=?
        WHERE doc_id = ?  `,
      [
        data.docVersionInfoEdit,
        data.docEditDate,
        data.userID,
        data.docEditDate,
        data.userID,
        data.IPAddress,
        data.browserName,
        data.browserVersion,
        data.osName,
        data.osVersion,
        data.docID,
      ],
      (error, results, fields) => {
        if (error) {

          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },



  //update renewdoc

  updateDocMasterVersion: (data, callBack) => {
    mysqlpool.query(
      `UPDATE document_master 
        SET 
          docVer = ?,
          docVer_amentment = ?,
          doc_ver_date = ?,
          doc_exp_start = ?,
          doc_exp_end = ?,
          isRequiredExp = ?,
          editUser = ?,
          editDate = ?
        WHERE doc_id = ? `,
      [
        data.ren_docVersion,
        data.ren_docVersionAment,
        data.ren_doc_ver_date,
        data.ren_doc_exp_start,
        data.ren_doc_exp_end,
        data.ren_isRequiredExp,
        data.ren_userID,
        data.ren_docEditDate,
        data.ren_docID,
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  UpdateActiveStatus: (data, callBack) => {
    // console.log(" data", data);

    // console.log(" data.document_slno", data[0].document_slno);

    mysqlpool.query(
      `UPDATE document_detl 
        SET 
          docActiveStatus = 1
        WHERE docd_slno = ?`,
      [
        data[0].document_slno,
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  // UpdateActiveStatus: (data, callBack) => {
  //   console.log("data:", data);

  //   mysqlpool.query(
  //     `UPDATE document_detl 
  //     SET docActiveStatus = 1
  //     WHERE docd_slno = ?`,
  //     [data.document_slno],
  //     (error, results) => {
  //       if (error) {
  //         logger.error(error);
  //         return callBack(error);
  //       }

  //       // If update affected rows, proceed with insert
  //       if (results.affectedRows > 0) {
  //         const insertQuery = `
  //         INSERT INTO document_detail_replace_audit_log (
  //           document_no, 
  //           document_id, 
  //           prev_event, 
  //           new_event, 
  //           replaced_ip_address, 
  //           replaced_browser_name,
  //           replaced_os_name, 
  //           replaced_os_version, 
  //           replaced_browser_version
  //         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  //       `;

  //         mysqlpool.query(
  //           insertQuery,
  //           [
  //             data.document_no,
  //             data.docID,
  //             data.prev_event,
  //             data.new_event,
  //             data.IPAddress,
  //             data.browserName,
  //             data.browserVersion,
  //             data.osName,
  //             data.osVersion,
  //           ],
  //           (insertError, insertResults) => {
  //             if (insertError) {
  //               logger.error(insertError);
  //               return callBack(insertError);
  //             }

  //             return callBack(null, results);
  //           }
  //         );
  //       } else {
  //         // No record found to update
  //         return callBack(null, results);
  //       }
  //     }
  //   );
  // },


  DocDelete: (data, callBack) => {
    // console.log("DocDelete", data);

    mysqlpool.query(
      `UPDATE document_detl 
        SET 
          docActiveStatus = ?,
          docEditUser=?,
          docEditDate=?,
          edited_ip_address=?,
          edited_browser_name=?,
          edited_browser_version=?,
          edited_os_name=?,
          edited_os_version=?
        WHERE docd_slno = ?`,
      [
        data.docActiveStatus,
        data.docCreateUser,
        data.docEditDate,
        data.IPAddress,
        data.browserName,
        data.browserVersion,
        data.osName,
        data.osVersion,
        data.docd_slno
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DocApprovals: (data, callBack) => {
    mysqlpool.query(
      `UPDATE document_master 
        SET 
         apprvl_status=?,
         apprvl_user=?,
         apprvl_date=?
         WHERE doc_id = ? `,
      [
        data.apprvl_status,
        data.apprvl_user,
        data.apprvl_date,
        data.doc_id
      ],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDocMasterByTypeId: (id, callBack) => {
    mysqlpool.query(
      `
SELECT 
            D.doc_slno,
            D.doc_id,
            D.doc_number,
            D.doc_name,
            D.doc_desc,
            D.doc_type, -- DOC TYPE
            T.main_type_name,
            D.doc_sub_type, -- DOC-SUB-TYPE
            S.doc_sub_type_name,
            D.institute, -- INSTITUTE
            I.institution_name,
            D.course, -- COURSE
            C.course_name,
            D.category, -- CATEGORY
            G.category_name,
            D.sub_category, -- SUB CATEGORY
            SC.subcat_name,
            D.group_mast, -- GROUP MASTER 
            DG.group_name,
            D.docVer,
            D.docVer_amentment,
            D.dovVer_infoAment,
            D.doc_date, 
            D.doc_ver_date,
            D.doc_exp_start,
            D.doc_exp_end,
            D.isRequiredExp,
            D.isSecure,
            D.docRack, -- RACK NAME
            R.rac_desc,
            LM.loc_name,
            CONCAT(R.rac_alice ,' - ', UPPER(LM.loc_name)) AS rack, -- RACK AND LOCATION NAME
            D.docCustodian, 
            CN.cust_name,-- CUSTODIAN NAME
            D.uploadUser,
            U.name,
            D.uploadDate,
            D.apprvl_status,
            D.apprvl_user,
            D.apprvl_date
        FROM document_master D
      LEFT JOIN doc_main_type T ON T.main_type_slno = D.doc_type
            LEFT JOIN doc_sub_type_master S ON S.sub_type_slno = D.doc_sub_type
            LEFT JOIN institution_master I ON I.institution_slno = D.institute
            LEFT JOIN course_master C ON C.course_slno = D.course
            LEFT JOIN doc_category_master G ON G.cat_slno = D.category
            LEFT JOIN doc_subcat_master SC ON SC.subcat_slno = D.sub_category
            LEFT JOIN doc_group_master DG ON DG.group_slno = D.group_mast
            LEFT JOIN rack_master R ON R.rac_slno = D.docRack
            LEFT JOIN location_master LM ON LM.loc_slno = R.loc_slno
            LEFT JOIN custodian_master CN ON CN.cust_slno = D.docCustodian
            LEFT JOIN user U ON U.user_slno = D.uploadUser
        WHERE docStatus = 1 AND D.doc_type = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  selectmainCategories: (callBack) => {
    mysqlpool.query(
      `SELECT sub_type_slno, doc_sub_type_name, doc_sub_type_status FROM doc_sub_type_master where doc_sub_type_status=1`,
      [],
      (error, results, fields) => {
        if (error) {
          logger.error(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

};
