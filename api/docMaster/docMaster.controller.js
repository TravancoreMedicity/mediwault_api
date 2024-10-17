const logger = require('../../logger/logger');

const {
    insertDocMaster,
    checkDocNameDuplicate,
    getDocMaster,
    getDocMasterById,
    getDocMasterLikeName,
    getDocNonSecure,
    getDocSecureOnly,
    inCrementDocSerialNumber
} = require('./docMaster.service');

const { uploadFile } = require('../multer.config/FileuploadConfig');

module.exports = {

    insertDocMaster: (req, res) => {

        // console.log(JSON.stringify(req.body))
        uploadFile(req, res, (err) => {
            const body = req.body

            // console.log(body)
            // const postData = JSON.parse(JSON.parse(JSON.stringify(body))?.postData);
            // console.log(postData)
            // if (err) {
            //     logger.error(err)
            //     return res.status(500).json({
            //         success: 0,
            //         message: 'Database connection error'
            //     })
            // }

            // console.log(req.body)
            // console.log(req.file)
            // console.log(req.files)

            // const name = body?.docName?.trim()
            // checkDocNameDuplicate(name, (err, results) => {
            //     if (err) {
            //         logger.error(err)
            //         return res.status(500).json({
            //             success: 0,
            //             message: 'Database connection error'
            //         })
            //     }
            //     if (results?.length > 0) {
            //         return res.status(200).json({
            //             success: 2,
            //             message: 'Doc name already exist'
            //         })
            //     }
            //     if (results?.length === 0) {
            //         insertDocMaster(body, (err, results) => {
            //             if (err) {
            //                 logger.error(err)
            //                 return res.status(500).json({
            //                     success: 0,
            //                     message: 'Database connection error'
            //                 })
            //             }
            //             if (results) {
            //                 inCrementDocSerialNumber((err, results) => logger.error(err))
            //                 return res.status(200).json({
            //                     success: 1,
            //                     message: 'Record Inserted successfully',
            //                 })
            //             }
            //         })
            //     }
            // })




        })



    },
    getDocMaster: (req, res) => {
        getDocMaster((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    },
    getDocMasterById: (req, res) => {
        const id = req.params.id
        getDocMasterById(id, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    },
    getDocMasterLikeName: (req, res) => {
        const body = req.body
        getDocMasterLikeName(body, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    },
    getDocNonSecure: (req, res) => {
        getDocNonSecure((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    },
    getDocSecureOnly: (req, res) => {
        getDocSecureOnly((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    }
}