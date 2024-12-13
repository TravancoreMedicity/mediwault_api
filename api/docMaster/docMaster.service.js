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
                uploadUser,
                uploadDate
            ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        1,
        data.docRack,
        data.docCustodian,
        data.docVersion,
        data.userID,
        data.docUpload
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
                D.doc_slno,
                D.doc_id,
                D.doc_number,
                D.docVer,
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
                D.doc_ver_date
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
      WHERE D.docStatus = 1 ORDER BY D.doc_slno DESC LIMIT 20`,
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
      WHERE D.docStatus = 1 AND D.isSecure = 0 ORDER BY D.doc_slno DESC LIMIT 20`,
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
  insertDocDetl: (data) =>
    data?.map(
      (item) =>
        new Promise((resolve, reject) => {
          mysqlpool.query(
            `INSERT INTO document_detl (
                doc_id,
                doc_number,
                originalname,
                mimetype,
                filename,
                docVer,
                docVerDate,
                docCreatedDate,
                docCreateUser
              ) 
              VALUES (?,?,?,?,?,?,?,?,?)`,
            [
              item.docID,
              item.docNumber,
              item.originalname,
              item.mimetype,
              item.filename,
              item.docVersion,
              item.docCreatedDate,
              item.docCreatedDate,
              item.docCreatedBy
            ],
            (error, results, fields) => {
              if (error) {
                logger.error(error);
                return reject(error);
              }
              return resolve(results);
            }
          );
        })
    ),
  getDocDetlinfo: (id, callBack) => {
    mysqlpool.query(
      `SELECT 
                doc_id,
                doc_number,
                originalname,
                mimetype,
                filename
            FROM document_detl
            WHERE doc_id = ?`,
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
          D.doc_type_master_name,
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
};
