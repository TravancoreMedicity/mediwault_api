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
            return res
              .status(200)
              .json({
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
        return res
          .status(200)
          .json({
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
              Promise.all(insertDocDetl(postUploadFileData))
                .then(() => {
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
    const body = req.body;
    getDocMasterLikeName(body, (err, results) => {
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
};
