const logger = require('../../logger/logger');

const {
    insertInstitutionMaster,
    editInstitutionMaster,
    getAllInstitutionMaster,
    checkDuplicateInstitutionName
} = require('./institutionMaster.service');

module.exports = {
    insertInstitutionMaster: (req, res) => {
        const body = req.body
        const institutionName = body?.institution_name?.trim()
        checkDuplicateInstitutionName(institutionName, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Institution name already exist"
                })
            }
            if (results?.length === 0) {
                // console.log(body)
                insertInstitutionMaster(body, (err, results) => {
                    if (err) {
                        logger.error(err)
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    })
                })
            }
        })
    },
    editInstitutionMaster: (req, res) => {
        editInstitutionMaster(req.body, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            })
        })
    },

    getAllInstitutionMaster: (req, res) => {
        getAllInstitutionMaster((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: 2,
                    data: []
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}