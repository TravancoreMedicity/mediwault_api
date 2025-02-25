const logger = require("../../logger/logger");

const {
  insertDocMaster,
  checkDocNameDuplicate,
  getDocMaster,
  getDocMasterById,
  getDocMasterLikeName,
  getDocNonSecure,
  getDocSecureOnly,
  inCrementDocSerialNumber,
  insertDocDetl,
  getDocDetlinfo,
  getDocTypeCount,
  getDocMasterLikeNameNonSecureOnly,
  getSearchData,
  updateDocMaster,
  updateDocMasterVersion,
  UpdateActiveStatus, DocDelete, DocApprovals, getNonSecDocMaster
} = require("./docMaster.service");

const { uploadFile } = require("../multer.config/FileuploadConfig");
const multer = require("multer");

module.exports = {
  insertDocMaster: (req, res) => {
    // console.log(JSON.stringify(req.body))
    uploadFile(req, res, (err) => {
      //   const body = req.body;
      //   console.log(req.files);
      if (err) {
        // Multer-specific errors
        if (err instanceof multer.MulterError) {
          // Multer error File too large. Max size is 10MB.
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(200).json({
              success: 0,
              message: "File too large. Max size is 10MB.",
            });
          }
          // Handle other multer errors here as needed
          return res.status(200).json({ success: 0, message: err.message });
        }

        // Custom errors from `checkFileType` or other areas
        if (
          err === "Error: Only .png, .jpg, .jpeg and .pdf files are allowed!"
        ) {
          return res.status(200).json({ success: 0, message: err });
        }

        // Unknown error
        return res.status(200).json({
          success: 0,
          message: "An unknown error occurred during file upload.",
        });
      }

      const body = JSON.parse(JSON.parse(JSON.stringify(req.body))?.postData);
      const fileInformation = (req.files?.length > 0 && req.files) || [];
      const postUploadFileData = fileInformation?.map((el) => {
        return {
          ...el,
          docID: body.docID,
          docNumber: body.docNumber,
          docVersion: body.docVersion,
          docVersionAment: body.docVersionAment,
          docVersionInfoEdit: body.docVersionInfoEdit,
          docCreatedDate: body.docUpload,
          docCreatedBy: body.userID
        };
      });

      const name = body?.docName?.trim();
      checkDocNameDuplicate(name, (err, results) => {
        if (err) {
          logger.error(err);
          return res.status(200).json({
            success: 0,
            message: "Database connection error",
          });
        }
        if (results?.length > 0) {
          return res.status(200).json({
            success: 2,
            message: "Doc name already exist",
          });
        }
        if (results?.length === 0) {
          insertDocMaster(body, (err, results) => {
            if (err) {
              logger.error(err);
              return res.status(200).json({
                success: 0,
                message: "Database connection error",
              });
            }
            if (results) {
              // INSERT DOCUEMTN DETAILS FILE UPLOAD
              Promise.all(insertDocDetl(postUploadFileData)).then(() => {
                inCrementDocSerialNumber((err, results) => logger.error(err)); //increment file upload doc number
                return res.status(200).json({
                  success: 1,
                  message: "Record Inserted successfully",
                });
              })
                .catch((err) => {
                  logger.error(err);
                  return res.status(200).json({
                    success: 0,
                    message: err,
                  });
                });
            } else {
              return res.status(200).json({
                success: 0,
                message: "Record not Inserted",
              });
            }
          });
        }
      });
    });
  },
  getDocMaster: (req, res) => {
    getDocMaster((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },

  getNonSecDocMaster: (req, res) => {
    getNonSecDocMaster((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },

  getDocMasterById: (req, res) => {
    const id = req.params.id;
    getDocMasterById(id, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocMasterLikeName: (req, res) => {
    const id = req.params.id;
    getDocMasterLikeName(id, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocMasterLikeNameNonSecureOnly: (req, res) => {
    const id = req.params.id;
    getDocMasterLikeNameNonSecureOnly(id, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocNonSecure: (req, res) => {
    getDocNonSecure((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocSecureOnly: (req, res) => {
    getDocSecureOnly((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocDetlinfo: (req, res) => {
    const id = req.params.id;
    getDocDetlinfo(id, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  getDocTypeCount: (req, res) => {
    getDocTypeCount((err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },


  getSearchData: (req, res) => {
    const state = req.body

    const ObjToArray = [
      { value: state.docType, sql: `AND D.doc_type = ${state.docType}` },
      { value: state.subType, sql: `AND D.doc_sub_type = ${state.subType}` },
      { value: state.category, sql: `AND D.category = ${state.category}` },
      { value: state.subCategory, sql: `AND D.sub_category = ${state.subCategory}` },
      { value: state.group, sql: `AND D.group_mast = ${state.group}` },
      { value: state.institute, sql: `AND D.institute = ${state.institute}` },
      { value: state.course, sql: `AND D.course = ${state.course}` },
      { value: state.docNumber, sql: `AND D.doc_id = ${state.docNumber}` },
      { value: state.fileName, sql: `AND D.doc_name LIKE '%${state.fileName}%'` }
    ]

    const array = ObjToArray?.filter(e => e.value !== 0 && e.value !== undefined && e.value !== null)?.map(e => `${e.sql}`).join(" ")

    if (ObjToArray?.filter(e => e.value !== 0 && e.value !== undefined && e.value !== null)?.length === 0) {
      return res.status(200).json({
        success: 2,
        message: "no data",
      });
    } else {
      const sql = `SELECT 
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
                WHERE D.docStatus = 1 ${array === "" ? 'ORDER BY D.doc_slno DESC' : array}`

      getSearchData(sql, (err, results) => {
        // console.log(results);


        if (err) {
          logger.error(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }

        if (results.length === 0) {
          return res.status(200).json({
            success: 2,
            message: "no data",
          });
        }

        return res.status(200).json({
          success: 1,
          message: "success",
          data: results,
        });
      });
    }

  },

  updateDocMaster: (req, res) => {
    const body = req.body
    updateDocMaster(body, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
  //Renew Document
  UpdateRenewDocument: (req, res) => {
    // console.log(JSON.stringify(req.body))
    uploadFile(req, res, (err) => {
      //   const body = req.body;
      //   console.log(req.files);
      if (err) {
        // Multer-specific errors
        if (err instanceof multer.MulterError) {
          // Multer error File too large. Max size is 10MB.
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(200).json({
              success: 0,
              message: "File too large. Max size is 10MB.",
            });
          }
          // Handle other multer errors here as needed
          return res.status(200).json({ success: 0, message: err.message });
        }

        // Custom errors from `checkFileType` or other areas
        if (
          err === "Error: Only .png, .jpg, .jpeg and .pdf files are allowed!"
        ) {
          return res.status(200).json({ success: 0, message: err });
        }

        // Unknown error
        return res.status(200).json({
          success: 0,
          message: "An unknown error occurred during file upload.",
        });
      }

      const body = JSON.parse(JSON.parse(JSON.stringify(req.body))?.postData);
      // console.log("body", body);

      const fileInformation = (req.files?.length > 0 && req.files) || [];
      const postUploadFileData = fileInformation?.map((el) => {
        return {
          ...el,
          docID: body.ren_docID,
          docNumber: body.docNumber,
          docVersion: body.ren_docVersion,
          docVersionAment: body.ren_docVersionAment,
          docVersionInfoEdit: body.ren_docVersionInfoEdit,
          docCreatedDate: body.ren_docUpload,
          docCreatedBy: body.ren_userID
        };
      });
      // update document master Table
      updateDocMasterVersion(body, (err, results) => {
        // console.log(body);

        if (err) {
          logger.error(err);
          return res.status(500).json({
            success: 0,
            message: err,
          });
        }
        else {
          UpdateActiveStatus(body, (err, results) => {
            if (err) {
              logger.error(err);
              return res.status(500).json({
                success: 0,
                message: err,
              });
            }
            else {



              // insertDocMaster(body, (err, results) => {
              //   console.log("insertDocMaster body", body);

              //   if (err) {
              //     logger.error(err);
              //     return res.status(200).json({
              //       success: 0,
              //       message: "Database connection error",
              //     });
              //   }
              if (results) {
                // INSERT DOCUEMTN DETAILS FILE UPLOAD
                Promise.all(insertDocDetl(postUploadFileData)).then(() => {
                  inCrementDocSerialNumber((err, results) => logger.error(err)); //increment file upload doc number
                  return res.status(200).json({
                    success: 1,
                    message: "Document Inserted successfully",
                  });
                })
                  .catch((err) => {
                    logger.error(err);
                    return res.status(200).json({
                      success: 0,
                      message: err,
                    });
                  });
              } else {
                return res.status(200).json({
                  success: 0,
                  message: "Record not Inserted",
                });
              }
              // });
            }
          })
        }
        // return res.status(200).json({
        //   success: 1,
        //   message: "success",
        //   data: results,
        // });

      });
    });
  },


  DocDelete: (req, res) => {
    const body = req.body
    DocDelete(body, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },


  ReplaceDocument: (req, res) => {
    // console.log(JSON.stringify(req.body))
    uploadFile(req, res, (err) => {
      //   const body = req.body;
      // console.log(req.files);
      if (err) {
        // Multer-specific errors
        if (err instanceof multer.MulterError) {
          // Multer error File too large. Max size is 10MB.
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(200).json({
              success: 0,
              message: "File too large. Max size is 10MB.",
            });
          }
          // Handle other multer errors here as needed
          return res.status(200).json({ success: 0, message: err.message });
        }

        // Custom errors from `checkFileType` or other areas
        if (
          err === "Error: Only .png, .jpg, .jpeg and .pdf files are allowed!"
        ) {
          return res.status(200).json({ success: 0, message: err });
        }

        // Unknown error
        return res.status(200).json({
          success: 0,
          message: "An unknown error occurred during file upload.",
        });
      }

      const body = JSON.parse(JSON.parse(JSON.stringify(req.body))?.postData);
      // console.log("body", body);

      const fileInformation = (req.files?.length > 0 && req.files) || [];
      const postUploadFileData = fileInformation?.map((el) => {
        return {
          ...el,
          docID: body.ren_docID,
          docNumber: body.docNumber,
          docVersion: body.ren_docVersion,
          docVersionAment: body.ren_docVersionAment,
          docVersionInfoEdit: body.ren_docVersionInfoEdit,
          docCreatedDate: body.ren_docUpload,
          docCreatedBy: body.ren_userID
        };
      });
      // update document master Table
      updateDocMasterVersion(body, (err, results) => {
        // console.log(body);

        if (err) {
          logger.error(err);
          return res.status(500).json({
            success: 0,
            message: err,
          });
        }
        else {
          UpdateActiveStatus(body, (err, results) => {
            if (err) {
              logger.error(err);
              return res.status(500).json({
                success: 0,
                message: err,
              });
            }
            else {



              // insertDocMaster(body, (err, results) => {
              //   console.log("insertDocMaster body", body);

              //   if (err) {
              //     logger.error(err);
              //     return res.status(200).json({
              //       success: 0,
              //       message: "Database connection error",
              //     });
              //   }
              if (results) {
                // INSERT DOCUEMTN DETAILS FILE UPLOAD
                Promise.all(insertDocDetl(postUploadFileData)).then(() => {
                  inCrementDocSerialNumber((err, results) => logger.error(err)); //increment file upload doc number
                  return res.status(200).json({
                    success: 1,
                    message: "Document Inserted successfully",
                  });
                })
                  .catch((err) => {
                    logger.error(err);
                    return res.status(200).json({
                      success: 0,
                      message: err,
                    });
                  });
              } else {
                return res.status(200).json({
                  success: 0,
                  message: "Record not Inserted",
                });
              }
              // });
            }
          })
        }
        // return res.status(200).json({
        //   success: 1,
        //   message: "success",
        //   data: results,
        // });

      });
    });
  },
  DocApprovals: (req, res) => {
    const body = req.body
    DocApprovals(body, (err, results) => {
      if (err) {
        logger.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "success",
        data: results,
      });
    });
  },
};
