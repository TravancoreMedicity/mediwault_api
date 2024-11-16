require('dotenv').config();
const logger = require('../../logger/logger');
const {
    insertDocTypeMaster,
    getDocTypeMaster,
    getDocTypeMasterById,
    editDocTypeMaster,
    inactiveDocTypeMater,
    docTypeMasterNameChecking,
    selectDocTypeMaster
} = require('./docTypeMaster.service');

module.exports = {
    insertDocTypeMaster: (req, res) => {
        const body = req.body
        // Checking function for name already excist or not
        const docTypeMasterName = body?.docTypeMasterName?.trim()

        docTypeMasterNameChecking({ docTypeMasterName }, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Document type name already exist"
                });
            }
            if (results?.length === 0) {
                insertDocTypeMaster(body, (err, results) => {
                    if (err) {
                        logger.error(err)
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: 'success',
                        data: results
                    });
                });
            }
        })
    },
    editDocTypeMaster: (req, res) => {
        editDocTypeMaster(req.body, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            });
        });
    },
    inactiveDocTypeMater: (req, res) => {
        const id = req.params.id
        inactiveDocTypeMater(id, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            });
        });
    },
    getDocTypeMaster: (req, res) => {
        getDocTypeMaster((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            });
        });
    },
    getDocTypeMasterById: (req, res) => {
        const id = req.params.id
        getDocTypeMasterById(id, (err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            });
        });
    },
    selectDocTypeMaster: (req, res) => {
        selectDocTypeMaster((err, results) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'success',
                data: results
            });
        });
    }

}